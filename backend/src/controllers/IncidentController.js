const connection = require('../database/connection')

module.exports = {
	async list(request, response) {
		const [count] = await connection('incidents')
			.count()
		const { page = 1 } = request.query;
		const incidents = await connection('incidents')
			.join('ongs', 'ongs.id', '=', 'incidents.ong_id')
			.select(["incidents.*", 'ongs.email', 'ongs.name', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
			.limit(5)
			.offset((page - 1) * 5)
			;
		response.header('X-TotalCount', count['count(*)'])
		return response.status(200).json({
			incidents,
		});
	},
	async create(request, response) {
		const { title, description, value } = request.body
		const ong_id = request.headers.authorization

		const [id] = await connection('incidents').insert({
			title,
			description,
			value,
			ong_id
		})
		return response.status(200).json({ id })
	},
	async delete(request, response) {
		const { id } = request.params;
		const ong_id = request.headers.authorization;

		const incident = await connection('incidents')
			.where('id', id)
			.select('ong_id')
			.first()
		console.log(incident)
		if (incident.ong_id !== ong_id) {
			return response.status(401).json({ error: 'Operation not permited ' })
		}
		await connection('incidents')
			.where('id', id)
			.delete();
		return response.status(204).send()
	}
}