import { read, utils } from 'xlsx';

export interface VentaData {
  Sede: string;
  Fecha: Date | string;
  Monto: number;
}

export interface NominaData {
  Sede: string;
  Rol: string;
  Horas_Trabajadas: number;
  Costo: number;
}

export interface OperacionesAtencionData {
  Ticket_ID: string;
  Tiempo_Respuesta_Minutos: number;
  Sede: string;
}

export interface AppData {
  ventas: VentaData[];
  nomina: NominaData[];
  operacionesAtencion: OperacionesAtencionData[];
}

// Data Sentinel: Validates the shape of the data
const validateVentas = (data: Record<string, unknown>[]): VentaData[] => {
  return data
    .filter((row) => row.Sede && row.Monto != null)
    .map((row) => ({
      ...row,
      Monto: Number(row.Monto) || 0,
    })) as unknown as VentaData[];
};

const validateNomina = (data: Record<string, unknown>[]): NominaData[] => {
  return data
    .filter((row) => row.Sede && row.Costo != null)
    .map((row) => ({
      ...row,
      Horas_Trabajadas: Number(row.Horas_Trabajadas) || 0,
      Costo: Number(row.Costo) || 0,
    })) as unknown as NominaData[];
};

const validateOperacionesAtencion = (
  data: Record<string, unknown>[]
): OperacionesAtencionData[] => {
  return data
    .filter((row) => row.Ticket_ID && row.Tiempo_Respuesta_Minutos != null)
    .map((row) => ({
      ...row,
      Tiempo_Respuesta_Minutos: Number(row.Tiempo_Respuesta_Minutos) || 0,
    })) as unknown as OperacionesAtencionData[];
};

export const parseExcelFile = async (file: File): Promise<AppData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = read(data, { type: 'binary', cellDates: true });

        // Parse sheets
        const result: AppData = {
          ventas: [],
          nomina: [],
          operacionesAtencion: [],
        };

        // Expected sheet names or rely on order if names vary
        const sheetNames = workbook.SheetNames;

        // Try to match sheets by name, fallback to indices if needed
        const ventasSheetName = sheetNames.find((s) =>
          s.toLowerCase().includes('venta')
        );
        const nominaSheetName = sheetNames.find((s) =>
          s.toLowerCase().includes('nomina') || s.toLowerCase().includes('nómina')
        );
        const operacionesSheetName = sheetNames.find((s) =>
          s.toLowerCase().includes('operacion') || s.toLowerCase().includes('atencion')
        );

        if (ventasSheetName) {
          const rawVentas = utils.sheet_to_json<Record<string, unknown>>(
            workbook.Sheets[ventasSheetName]
          );
          result.ventas = validateVentas(rawVentas);
        }

        if (nominaSheetName) {
          const rawNomina = utils.sheet_to_json<Record<string, unknown>>(
            workbook.Sheets[nominaSheetName]
          );
          result.nomina = validateNomina(rawNomina);
        }

        if (operacionesSheetName) {
          const rawOperaciones = utils.sheet_to_json<Record<string, unknown>>(
            workbook.Sheets[operacionesSheetName]
          );
          result.operacionesAtencion = validateOperacionesAtencion(
            rawOperaciones
          );
        }

        resolve(result);
      } catch (error) {
        console.error('Error parsing excel:', error);
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsBinaryString(file);
  });
};
