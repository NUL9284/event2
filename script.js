
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDcpzHOv6y1RwXpxc2nwsqDqYwRfiLb35M",
  authDomain: "event-f9796.firebaseapp.com",
  projectId: "event-f9796",
  storageBucket: "event-f9796.firebasestorage.app",
  messagingSenderId: "786681171905",
  appId: "1:786681171905:web:183b1432cc4e0108c5e940",
  measurementId: "G-WX0EDLEVB4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Lógica para ENVIAR comentario ---
const form = document.getElementById("formComentarios");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("user").value;
    const mensaje = document.getElementById("mensajeIn").value;

    await addDoc(collection(db, "comentarios"), {
        nombre: nombre,
        mensaje: mensaje,
        fecha: new Date()
    });
    form.reset();
});

// --- Lógica para LEER comentarios en tiempo real ---
// --- Lógica para LEER comentarios en tiempo real ---
const q = query(collection(db, "comentarios"), orderBy("fecha", "desc"));
onSnapshot(q, (snapshot) => {
    const lista = document.getElementById("listaComentarios");
    lista.innerHTML = ""; // Limpiar lista
    snapshot.forEach((doc) => {
        const data = doc.data();
        
        // --- NUEVO: Formatear la fecha ---
        let fechaFormateada = "";
        if (data.fecha) {
            // Convertir Timestamp de Firebase a objeto Date de JS
            const fechaObjeto = data.fecha.toDate();
            // Formatear a un estilo legible (ej. 07/02/2026, 19:30)
            fechaFormateada = fechaObjeto.toLocaleString(); 
        }

        // --- NUEVO: Mostrar la fecha en el HTML ---
        lista.innerHTML += `
            <div class="comentario">
                <p><strong>${data.nombre}:</strong> ${data.mensaje}</p>
                <small style="color: gray;">${fechaFormateada}</small>
            </div>
        `;
    });
});



// const q = query(collection(db, "comentarios"), orderBy("fecha", "desc"));
// onSnapshot(q, (snapshot) => {
//     const lista = document.getElementById("listaComentarios");
//     lista.innerHTML = ""; // Limpiar lista
//     snapshot.forEach((doc) => {
//         const data = doc.data();
//         lista.innerHTML += `
//             <p><strong>${data.nombre}:</strong> ${data.mensaje}</p>
//         `;
//     });
// });