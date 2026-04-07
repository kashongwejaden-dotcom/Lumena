import React from 'react';

export const getWhatsAppLink = (phoneNumber, message) => {
  // Supprimer les espaces, les symboles + ou autres pour le numéro
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};
