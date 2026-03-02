import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppData, parseExcelFile } from '../lib/excelParser';
import { toast } from 'sonner';

// Initialize with some default structure or empty arrays
const defaultData: AppData = {
    ventas: [],
    nomina: [],
    operacionesAtencion: [],
};

interface DataContextType {
    data: AppData;
    isLoading: boolean;
    handleFileUpload: (file: File) => Promise<void>;
    lastUpdated: Date | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [data, setData] = useState<AppData>(defaultData);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    useEffect(() => {
        // Load cached data on mount
        const cachedData = localStorage.getItem('omniaData');
        if (cachedData) {
            try {
                const parsed = JSON.parse(cachedData);
                // Handle date string to Date object mapping if necessary
                setData(parsed.data);
                setLastUpdated(new Date(parsed.lastUpdated));
            } catch (e) {
                console.error('Failed to parse cached data', e);
            }
        }
        setIsLoading(false);
    }, []);

    const handleFileUpload = async (file: File) => {
        setIsLoading(true);
        try {
            const parsedData = await parseExcelFile(file);
            setData(parsedData);
            const now = new Date();
            setLastUpdated(now);

            // Cache it
            localStorage.setItem(
                'omniaData',
                JSON.stringify({ data: parsedData, lastUpdated: now })
            );

            toast.success('Excel procesado correctamente. Datos actualizados.', {
                description: `Se cargaron ${parsedData.ventas.length} registros de ventas.`,
            });
        } catch (error) {
            console.error(error);
            toast.error('Error al procesar el archivo Excel', {
                description: 'Asegurate de que el formato de columnas sea el adecuado.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DataContext.Provider value={{ data, isLoading, handleFileUpload, lastUpdated }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
