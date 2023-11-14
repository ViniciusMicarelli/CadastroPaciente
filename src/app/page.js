'use client';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/NavBar';

const App = () => {
  const [patients, setPatients] = useState([]);
  const [medications, setMedications] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [medicationTime, setMedicationTime] = useState('');
  const [medicationQuantity, setMedicationQuantity] = useState('');


  
  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(savedPatients);

    const savedMedications = JSON.parse(localStorage.getItem('medications')) || [];
    setMedications(savedMedications);
  }, []);

  // Salvar dados no localStorage sempre que houver uma alteração
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [patients, medications]);

  const addPatient = () => {
    // Verificar se todos os campos estão preenchidos antes de cadastrar
    if (patientName && patientAge) {
      const newPatient = { name: patientName, age: patientAge };
      setPatients([...patients, newPatient]);
      setPatientName('');
      setPatientAge('');
    } else {
      alert('Por favor, preencha todos os campos antes de cadastrar o paciente.');
    }
  };
  
  const addMedication = () => {
    // Verificar se todos os campos estão preenchidos antes de cadastrar
    if (medicationName && medicationTime && medicationQuantity) {
      const selectedPatient = patients.length > 0 ? patients[0] : {};
      const newMedication = {
        patientName: selectedPatient.name,
        patientAge: selectedPatient.age,
        medicationName,
        medicationTime,
        medicationQuantity,
      };
      setMedications([...medications, newMedication]);
      setMedicationName('');
      setMedicationTime('');
      setMedicationQuantity('');
    } else {
      alert('Por favor, preencha todos os campos antes de cadastrar a medicação.');
    }
    };

    const removePatient = (index) => {
      const updatedPatients = [...patients];
      updatedPatients.splice(index, 1);
      setPatients(updatedPatients);
    };
  
    const removeMedication = (index) => {
      const updatedMedications = [...medications];
      updatedMedications.splice(index, 1);
      setMedications(updatedMedications);
    };
  

    
  return (
    
    <div className="container mx-auto p-8 bg-gray-200">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">      Sistema de Cuidados Médicos</h1>
      <Navbar></Navbar>
      <form className="mb-6">
        <div className="mb-4">
          <label className="m-4 block text-gray-700 text-sm font-bold mb-2" htmlFor="patientName">
            Nome do Paciente:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="patientName"
            type="text"
            placeholder="Digite o nome do paciente"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="m-4 block text-gray-700 text-sm font-bold mb-2" htmlFor="patientAge">
            Idade do Paciente:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="patientAge"
            type="number"
            placeholder="Digite a idade do paciente"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={addPatient}
        >
          Cadastrar Paciente
        </button>
      </form>

      <hr className="my-8" />

      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Cadastro de Medicamentos</h1>

      <form className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientSelect">
            Escolha o Paciente:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="patientSelect"
          >
            {patients.map((patient, index) => (
              <option key={index} value={patient.name}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicationName">
            Nome do Medicamento:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="medicationName"
            type="text"
            placeholder="Digite o nome do medicamento"
            value={medicationName}
            onChange={(e) => setMedicationName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicationTime">
            Horário de Administração:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="medicationTime"
            type="time"
            value={medicationTime}
            onChange={(e) => setMedicationTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicationQuantity">
            Quantidade:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="medicationQuantity"
            placeholder="Digite a quantidade"
            value={medicationQuantity}
            onChange={(e) => setMedicationQuantity(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={addMedication}
        >
          Cadastrar Medicamento
        </button>
      </form>

      <hr className="my-8" />

<h1 className="text-3xl font-bold text-indigo-600 mb-6">Acompanhamento</h1>

<div>
        <h2 className="text-2xl font-bold mb-4">Pacientes</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Ação</th> {/* Novo cabeçalho para o botão de exclusão */}
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removePatient(index)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Medicamentos</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Nome do Paciente</th>
              <th>Idade</th>
              <th>Nome do Medicamento</th>
              <th>Horário</th>
              <th>Quantidade</th>
              <th>Ação</th> {/* Novo cabeçalho para o botão de exclusão */}
            </tr>
          </thead>
          <tbody>
            {medications.map((medication, index) => (
              <tr key={index}>
                <td>{medication.patientName}</td>
                <td>{medication.patientAge}</td>
                <td>{medication.medicationName}</td>
                <td>{medication.medicationTime}</td>
                <td>{medication.medicationQuantity}</td>
                <td>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeMedication(index)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;