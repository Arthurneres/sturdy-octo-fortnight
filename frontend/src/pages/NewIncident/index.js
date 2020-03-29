import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
	const [title, setTitle] = useState('')
	const [description, setDescrition] = useState('')
	const [value, setValue] = useState('')

	const history = useHistory()
	const ongId = localStorage.getItem('ongID')
	async function handleNewIncident(e) {
		e.preventDefault()
		try {
			const data = {
				title,
				description,
				value
			}
			await api.post('incidents', data, {
				headers: {
					Authorization: ongId
				}
			})
			history.push('/profile')
		}
		catch (err) {
			alert('Erro ao cadastrar o caso, tente novamente')
		}
	}

	return (
		<div className="new-incident-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />
					<h1>Cadastrar novo caso</h1>
					<p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>
					<Link className='back-link' to="/profile">
						<FiArrowLeft size={16} color='#e02041' />
						Voltar para Home
					</Link>
				</section>
				<form onSubmit={handleNewIncident}>
					<input
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder='Título do caso' />
					<textarea
						value={description}
						onChange={e => setDescrition(e.target.value)}
						className='textArea' placeholder='Descrição' />
					<input
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder='Valor em reais ' />
					<button className="button" type='submit'>Cadastrar</button>
				</form>

			</div>
		</div>
	)
}
