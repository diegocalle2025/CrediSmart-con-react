import { db } from  './firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const creditsData = [
    {
            name: "Crédito Libre Inversión", 
            description: "Un crédito flexible para tus necesidades personales.",
            minAmount: 1000000,
            maxAmount: 300000000,
            interestRate: 12.5,
            maxTerm: 60,
            requirements:"Debe ser mayor de 18 años, tener ingresos comprobables y buen historial crediticio.", 
            icon:""
    },

    {
        
        name: "Crédito Vehículo", 
        description: "Un crédito flexible para tus necesidades personales.",
        minAmount: 3000000,
        maxAmount: 50000000,
        interestRate: 9.8,
        maxTerm: 60,
        requirements:"Debe ser mayor de 18 años, tener ingresos comprobables y buen historial crediticio.", 
        icon:""
        },
    
        {
        
        name: "Crédito Vivienda", 
        description: "Un crédito flexible para tus necesidades personales.",
        minAmount: 10000000,
        maxAmount: 50000000,
        interestRate: 7.2,
        maxTerm: 240,
        requirements:"Debe ser mayor de 18 años, tener ingresos comprobables y buen historial crediticio.", 
        icon:""
        },
    
        {
        
        name: "Crédito Educativo", 
        description: "Un crédito flexible para tus necesidades personales.",
        minAmount: 1000000,
        maxAmount: 20000000,
        interestRate: 6.0,
        maxTerm: 48,
        requirements:"Debe ser mayor de 18 años, tener ingresos comprobables y buen historial crediticio.", 
        icon:""
        },
    
        {
        
        name: "Crédito Empresarial", 
        description: "Un crédito flexible para tus necesidades personales.",
        minAmount: 5000000,
        maxAmount: 80000000,
        interestRate: 11.0,
        maxTerm: 72,
        requirements:"Debe ser mayor de 18 años, tener ingresos comprobables y buen historial crediticio.", 
        icon:""
        },
];

const seedFirestore = async () => {
    try {
        console.log('Iniciando carga de datos a Firestore'); 
        for (const credit of creditsData) {
            const docRef = await addDoc(collection(db, 'credits'),credit);
            console.log(`${credit.name} agregado con ID: ${docRef.id}`); 
        }

        console.log('Carga de datos completada');
        console.log('En cuanto se guarden los registros borrar este archivo');
        

    } catch (error) {
        console.log('Error al cargar los datos', error);
    }

}

seedFirestore();