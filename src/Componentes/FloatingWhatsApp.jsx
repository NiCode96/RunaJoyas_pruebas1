"use client";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsAppButton() {
    return (
        <FloatingWhatsApp
            phoneNumber="+56 9 8593 7487" // tu número con código de país
            accountName="Runa Joyas 💎"
            avatar="/runaJoyas.png" // opcional: logo o imagen en public/
            statusMessage="Responde normalmente en unos minutos"
            chatMessage="¡Hola! 👋 ¿Cómo puedo ayudarte hoy?"
            placeholder="Escribe tu mensaje..."
            notification
            notificationSound
        />
    );
}