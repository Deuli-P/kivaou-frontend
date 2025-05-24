// src/components/modal/CreateEventModal.tsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { regexEmail } from "../../../utils/utils";
import Button from "../../Button/Button";
import Input from "../../Inputs/Input/Input";
const env = (window as any).env?.VITE_ENV_MOE || import.meta.env.VITE_ENV_MOE;
const API_URL = (window as any).env?.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL;

interface AddUserModalProps {
  onClose: () => void;
  setUsers: (users: any) => void;
}

const AddUserModal = ({ onClose, setUsers }: AddUserModalProps) => {
  const { user } = useAuth();

  const fakeEmail = "";

  const [email, setEmail] = useState(env === "DEV" ? fakeEmail : "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        `/server/api/v1/organization/add-user/${email}`,
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Ajouter un membre à l'organization</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <Input
            name="email"
            onChange={handleChange}
            value={email}
            required={true}
            label="Email de l'utilisateur :"
            type="email"
            ariaLabel="Email de l'utilisateur à ajouter"
            placeholder="Email de l'utilisateur à ajouter"
          />
          <div className="btn-container">
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
