import * as xlsx from 'xlsx';

const generateSampleExcel = () => {
    // Sheet 1: Ventas
    const ventasData = [
        { Sede: 'Galpón', Fecha: '2026-03-02', Monto: 2500 },
        { Sede: 'Casita', Fecha: '2026-03-02', Monto: 1800 },
        { Sede: 'Cabudare', Fecha: '2026-03-02', Monto: 2100 },
        { Sede: 'Caracas Oeste', Fecha: '2026-03-02', Monto: 3200 }
    ];

    // Sheet 2: Nomina
    const nominaData = [
        { Sede: 'Galpón', Rol: 'Coach A', Horas_Trabajadas: 40, Costo: 400 },
        { Sede: 'Galpón', Rol: 'Coach B', Horas_Trabajadas: 35, Costo: 350 },
        { Sede: 'Casita', Rol: 'Coach C', Horas_Trabajadas: 40, Costo: 400 },
        { Sede: 'Cabudare', Rol: 'Coach D', Horas_Trabajadas: 20, Costo: 200 }
    ];

    // Sheet 3: Operaciones Atencion
    const atencionData = [
        { Ticket_ID: 'TKT-001', Sede: 'Galpón', Tiempo_Respuesta_Minutos: 2 },
        { Ticket_ID: 'TKT-002', Sede: 'Casita', Tiempo_Respuesta_Minutos: 4 },
        { Ticket_ID: 'TKT-003', Sede: 'Cabudare', Tiempo_Respuesta_Minutos: 8 },
        { Ticket_ID: 'TKT-004', Sede: 'Caracas Oeste', Tiempo_Respuesta_Minutos: 1 },
        { Ticket_ID: 'TKT-005', Sede: 'Galpón', Tiempo_Respuesta_Minutos: 3 }
    ];

    // Create workbook and add sheets
    const wb = xlsx.utils.book_new();

    const wsVentas = xlsx.utils.json_to_sheet(ventasData);
    xlsx.utils.book_append_sheet(wb, wsVentas, 'Ventas');

    const wsNomina = xlsx.utils.json_to_sheet(nominaData);
    xlsx.utils.book_append_sheet(wb, wsNomina, 'Nomina');

    const wsAtencion = xlsx.utils.json_to_sheet(atencionData);
    xlsx.utils.book_append_sheet(wb, wsAtencion, 'Atencion');

    // Write to file
    xlsx.writeFile(wb, 'C:\\Users\\anton\\Desktop\\omnia_code\\fitness-pulse-95\\public\\sample_payload.xlsx');
    console.log("Sample Excel created at public/sample_payload.xlsx");
};

generateSampleExcel();
