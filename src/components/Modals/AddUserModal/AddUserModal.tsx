// src/components/modal/CreateEventModal.tsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { regexEmail } from "../../../utils/utils";
import Button from "../../Button/Button";
const env = import.meta.env.VITE_ENV_MODE;
const API_URL = import.meta.env.VITE_BACKEND_URL;

interface AddUserModalProps {
  onClose: () => void;
  setUsers: (users: any) => void;
}

const AddUserModal = ({ onClose, setUsers }: AddUserModalProps) => {
  const { user } = useAuth();

  const fakeEmail = "faux@email.io";

  const [email, setEmail] = useState(env === "DEV" ? fakeEmail : "");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!regexEmail.test(email) || email.length < 5) {
        toast.warning("L'email doit être valide");
        return;
      }

      if (!user?.organization) {
        toast.error(
          "Vous devez appartenir à une organisation pour créer un événement"
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/api/organization/add-user/${email}?id=${user.organization.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setUsers((prevUsers: any[]) => [...prevUsers, data.user]);
        toast.success(data.message);
        onClose();
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Erreur lors de la création de l'événement");
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h2>Ajouter un membre à l'organization</h2>
        <form onSubmit={handleSubmit}>
          <label
            className="input-label"
            htmlFor="email"
          >
            Email de l'utilisateur :
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => handleChange(e)}
              required
              className="input-input"
            />
          </label>
          <div className="modal-buttons">
            <Button 
              onClick={onClose}
              version="secondary"
              ariaLabel="Fermer la modale"
              label="Annuler"
            />
            <Button 
              type="submit"
              disabled={!email ? true : false}
              label="Ajouter un membre"
              version="primary"
              ariaLabel="Ajouter un membre à l'organisation"
            />
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddUserModal;
