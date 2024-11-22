import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useStore } from '../store/store';
import { schema, FormData } from '../schema/validationSchema';

const ContactForm = () => {
  const { errorTimers, isSubmitting, setErrorTimers, setIsSubmitting, theme } = useStore();
  const toast = useRef<Toast>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleErrorsVisibility = useCallback((field: keyof FormData) => {
    if (!errorTimers[field]) {
      setErrorTimers(field, true);
      setTimeout(() => {
        setErrorTimers(field, false);
      }, 3000);
    }
  }, [setErrorTimers, errorTimers]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/send-email`, data);
      if (toast.current) {
        toast.current.show({
          severity: 'success',
          summary: 'Enviado',
          detail: 'Datos enviados, pronto nos comunicaremos con usted',
          life: 3000,
          className: 'p-toast-message-success',
          icon: 'pi pi-check-circle',
        });
      }
      reset();
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      if (toast.current) {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Se ha producido un error al enviar los datos, intentelo más tarde',
          life: 3000,
          className: 'p-toast-message-error',
          icon: 'pi pi-times-circle',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    Object.keys(errors).forEach((field) => {
      if (!errorTimers[field]) {
        handleErrorsVisibility(field as keyof FormData);
      }
    });
  }, [errors, handleErrorsVisibility, errorTimers]);

  return (
    <div
      id="contact-section"
      className="mt-12 max-w-lg mx-auto p-6 bg-[var(--background-color)] shadow-lg rounded-lg transition-all duration-300 fade-in"
      style={{
        boxShadow: theme === 'dark'
          ? '0px 10px 25px rgba(255, 255, 255, 0.2)'
          : '0px 10px 25px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toast
        ref={toast}
        className="fixed top-5 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-10 sm:-translate-x-0 z-50"
      />
      <h2 className="text-2xl font-bold text-center mb-6 text-[var(--text-color)]">Contáctame</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="relative">
          <label htmlFor="name" className="block mb-2 text-[var(--text-color)]">Ingresa Tu Nombre</label>
          <InputText
            id="name"
            {...register('name')}
            className="w-full p-3 border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--accent-color)] transition-all"
          />
          <div className="text-red-500 text-sm min-h-[20px]">
            {errors.name && errorTimers.name && errors.name.message}
          </div>
        </div>
        <div className="relative">
          <label htmlFor="email" className="block mb-2 text-[var(--text-color)]"> Tu Correo Electrónico</label>
          <InputText
            id="email"
            {...register('email')}
            type="email"
            className="w-full p-3 border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--accent-color)] transition-all"
          />
          <div className="text-red-500 text-sm min-h-[20px]">
            {errors.email && errorTimers.email && errors.email.message}
          </div>
        </div>
        <div className="relative">
          <label htmlFor="phone" className="block mb-2 text-[var(--text-color)]">Tu Número de Teléfono</label>
          <InputText
            id="phone"
            {...register('phone')}
            type="tel"
            className="w-full p-3 border border-[var(--border-color)] rounded-md focus:ring-2 focus:ring-[var(--accent-color)] transition-all"
          />
          <div className="text-red-500 text-sm min-h-[20px]">
            {errors.phone && errorTimers.phone && errors.phone.message}
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-4 p-3 border-2 rounded-md focus:outline-none transition-all duration-300 ${isSubmitting ? 'bg-[var(--button-bg-color)]' : 'bg-[var(--button-bg-color)] hover:bg-[var(--button-hover-bg-color)]'} text-[var(--button-text-color)] border-[var(--button-border-color)] flex justify-center items-center`}
        >
          {isSubmitting ? (
            <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="5" />
          ) : (
            "Enviar"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
