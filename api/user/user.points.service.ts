import { getUser } from "./user.service";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.service";

// Obtener los puntos actuales del usuario desde Firebase
export const getUserPoints = async (): Promise<number> => {
    const user = await getUser(); // Suponiendo que esto devuelve el usuario autenticado
    const userDocRef = doc(db, "User", user[0].Firebase_uuid); // Se asume que el campo Firebase_uuid está correcto
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const data = userDoc.data();
        return data.points_balance || 0; // Retorna los puntos del usuario
    }

    return 0; // Si no existe el documento, retorna 0
};

// Actualizar los puntos del usuario en Firebase
export const updateUserPoints = async (newPoints: number): Promise<void> => {
    const user = await getUser();
    const userDocRef = doc(db, "User", user[0].Firebase_uuid);
    await updateDoc(userDocRef, { points_balance: newPoints });
};

