"use client"
import React, { useState } from 'react';
import Image from "next/image";
import './App.css'; // Estilo CSS importado\
import loginimage from '@/images/background6.jpg';
import { useRouter } from "next/navigation";
import { serverLogin } from "@/actions/auth";

export default function Login(){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const { push } = useRouter()

    function login(e){
        e.preventDefault()
        if (email === "testefiap" && senha === "123"){
            serverLogin()
            push("/")
        }else{
            toast.error("Credenciais Inválidas", {
                style: {
                    backgroundColor: '#333',
                    color: '#fff'
                }
            })
        }
    }


  return (
    <section className="app">
    <Image className="h-full w-full object-cover" src={loginimage} alt="" />
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={login}>
            <h2>Login</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}  
              />
              <label>Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password" 
                id="senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}  
              />
              <label>Password</label>
            </div>
            <button type="submit">Log in</button>
          </form>
        </div>
      </div>
    </section>
  );
};

