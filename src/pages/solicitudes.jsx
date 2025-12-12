import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import Swal from "sweetalert2";

export const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [solicitudActual, setSolicitudActual] = useState({
    id: "",
    nombre: "",
    cedula: "",
    email: "",
    tipoCredito: "",
    monto: "",
    plazo: "",
    ingresos: ""
  });

  // Cargar solicitudes
  useEffect(() => {
    const fetchSolicitudes = async () => {
      const querySnapshot = await getDocs(collection(db, "solicitudes"));
      const data = querySnapshot.docs.map(docItem => ({
        id: docItem.id,
        ...docItem.data()
      }));
      setSolicitudes(data);
    };

    fetchSolicitudes();
  }, []);

  // Abrir modal con datos precargados
  const abrirModalActualizar = (s) => {
    setSolicitudActual(s);
    setModalOpen(true);

    // (Opcional) toast de info al abrir
    Swal.fire({
      title: "Editar Solicitud",
      text: "Puedes actualizar los datos",
      icon: "info",
      toast: true,
      position: "top-end",
      timer: 1200,
      showConfirmButton: false
    });
  };

  // Guardar cambios → abre confirmación
  const guardarCambios = () => {
    Swal.fire({
      title: "¿Actualizar registro?",
      text: "Esta acción modificará los datos de la solicitud.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#aaa"
    }).then((result) => {
      if (result.isConfirmed) {
        confirmarActualizacion();
      }
    });
  };

  // Eliminar solicitud (función separada y disponible para los botones)
  const eliminarSolicitud = async (solicitud) => {
    Swal.fire({
      title: "¿Eliminar solicitud?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d64545",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Eliminando...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          const ref = doc(db, "solicitudes", solicitud.id);
          await deleteDoc(ref);

          // Quita de la pantalla la solicitud eliminada
          setSolicitudes(prev =>
            prev.filter((item) => item.id !== solicitud.id)
          );

          Swal.fire({
            icon: "success",
            title: "Eliminada",
            text: "La solicitud fue eliminada correctamente.",
            toast: true,
            position: "top-end",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error eliminando:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar la solicitud",
            icon: "error",
          });
        }
      }
    });
  };

  // Confirmar y actualizar en Firebase
  const confirmarActualizacion = async () => {
    try {
      // No guardar la propiedad `id` dentro del documento en Firestore,
      // porque el id ya está en la referencia del doc.
      const { id, ...rest } = solicitudActual;

      // Convertir campos numéricos (si vienen como string) a números
      const payload = {
        ...rest,
        monto: rest.monto === "" ? null : Number(rest.monto),
        plazo: rest.plazo === "" ? null : Number(rest.plazo),
        ingresos: rest.ingresos === "" ? null : Number(rest.ingresos)
      };

      const ref = doc(db, "solicitudes", id);

      // Mostrar loading
      Swal.fire({
        title: "Guardando...",
        text: "Actualizando datos",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      await updateDoc(ref, payload);

      // Éxito con toast
      Swal.fire({
        icon: "success",
        title: "Actualizado correctamente",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });

      // Actualizar en pantalla
      setSolicitudes(prev =>
        prev.map(s => (s.id === id ? { id, ...payload } : s))
      );

      setConfirmOpen(false);
      setModalOpen(false);

    } catch (error) {
      console.error("Error actualizando:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al actualizar. Revisa la consola."
      });
    }
  };

  return (
    <main className="container">
      <h2>Solicitudes de Crédito</h2>

      <div className="solicitudes-list">
        {solicitudes.map((s) => (
          <div key={s.id} className="solicitud-card">
            <h3>{s.nombre}</h3>
            <p><strong>Cédula:</strong> {s.cedula}</p>
            <p><strong>Email:</strong> {s.email}</p>
            <p><strong>Tipo crédito:</strong> {s.tipoCredito}</p>
            <p><strong>Monto:</strong> {s.monto}</p>
            <p><strong>Plazo:</strong> {s.plazo} meses</p>
            <p><strong>Ingresos:</strong> {s.ingresos}</p>
            <p><strong>Fecha:</strong> {s.fecha ? new Date(s.fecha).toLocaleString() : "Sin fecha"}</p>

            <button
              className="btn"
              onClick={() => abrirModalActualizar(s)}
            >
              Actualizar
              
            </button>

            <button
              className="btn"
              onClick={() => eliminarSolicitud(s)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* MODAL DE ACTUALIZAR */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Actualizar Solicitud</h3>

            <label>Nombre:</label>
            <input
              type="text"
              value={solicitudActual.nombre}
              onChange={(e) => setSolicitudActual({ ...solicitudActual, nombre: e.target.value })}
            />

            <label>Cédula:</label>
            <input
              type="text"
              value={solicitudActual.cedula}
              onChange={(e) => setSolicitudActual({ ...solicitudActual, cedula: e.target.value })}
            />

            <label>Email:</label>
            <input
              type="email"
              value={solicitudActual.email}
              onChange={(e) => setSolicitudActual({ ...solicitudActual, email: e.target.value })}
            />

            <label>Tipo de crédito</label>
            <select
              value={solicitudActual.tipoCredito}
              onChange={(e) =>
                setSolicitudActual({
                  ...solicitudActual,
                  tipoCredito: e.target.value
                })
              }
              className="modal-input"
            >
              <option value="">Seleccione un tipo</option>
              <option value="Libre inversión">Libre inversión</option>
              <option value="Vehículo">Vehículo</option>
              <option value="Vivienda">Vivienda</option>
              <option value="Educativo">Educativo</option>
              <option value="Empresarial">Empresarial</option>
            </select>

            <label>Monto:</label>
            <input
              type="number"
              value={solicitudActual.monto}
              onChange={(e) => setSolicitudActual({ ...solicitudActual, monto: e.target.value })}
            />

            <label>Plazo (meses):</label>
            <input
              type="number"
              value={solicitudActual.plazo}
              onChange={(e) => setSolicitudActual({ ...solicitudActual, plazo: e.target.value })}
            />

            <label>Ingresos:</label>
            <input
              type="number"
              value={solicitudActual.ingresos}
              onChange={(e) => setSolicitudActual({ ...solicitudActual, ingresos: e.target.value })}
            />

            <div className="modal-buttons">
              <button className="btn-save" onClick={guardarCambios}>Actualizar Registro</button>
              <button className="btn-cancel" onClick={() => setModalOpen(false)}>Cancelar</button>              
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
