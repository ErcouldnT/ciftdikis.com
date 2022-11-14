import { writable } from 'svelte/store';

export const items = writable([
	{
		name: 'Hagi',
		price: 300,
		img: 'https://i.ibb.co/dbY4HGN/296870080-429779835598845-8879077516993417425-n.jpg'
	},
	{
		name: 'Alex',
		price: 250,
		img: 'https://i.ibb.co/rv1hfPk/294894055-401807391864107-2541225990443624659-n.jpg'
	},
	{
		name: 'Sergen',
		price: 159,
		img: 'https://i.ibb.co/Gt97X7H/296634870-625735479122775-3688579193057263285-n.jpg'
	},
	{
		name: 'Bozkurt',
		price: 500,
		img: 'https://i.ibb.co/r4T1mPP/293727769-1116299248962670-2247192147148517299-n.jpg'
	},
	{
		name: 'Wesley Sneijder',
		price: 159,
		img: 'https://i.ibb.co/DR3nB2g/298200649-746239539824724-377260391141386800-n.jpg'
	}
]);

export const shoppingCart = writable([]);
