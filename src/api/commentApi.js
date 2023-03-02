import {
	collection,
	query,
	where,
	// doc,
	// setDoc,
	addDoc,
	getDoc,
	getDocs,
	doc,
	updateDoc,
	deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';

// Change this to set()
export const commentCreator = async (ürünId, yorumGönderen, içerik, yıldızSayısı) => {
	try {
		const docRef = await addDoc(collection(db, 'yorumlar'), {
			ürünId,
			yorumGönderen,
			içerik,
			yıldızSayısı,
			createdAt: Date.now()
		});
		console.log('Yorum kaydedildi: ', docRef.id);
	} catch (e) {
		console.error('Yorum kaydı başarısız: ', e);
	}
};

// export const updateProduct = async (
// 	id,
// 	approved,
// 	slug,
// 	category,
// 	productName,
// 	desc,
// 	seller,
// 	price,
// 	imgLink,
// 	tags,
// 	colors,
// 	sizes,
// 	amount
// ) => {
// 	const productRef = doc(db, 'ürünler', id);
// 	await updateDoc(productRef, {
// 		approved,
// 		slug,
// 		category,
// 		productName,
// 		desc,
// 		seller,
// 		price: Number(price).toFixed(2).replace('.', ','),
// 		imgLink,
// 		updatedAt: Date.now(),
// 		tags,
// 		colors,
// 		sizes,
// 		amount: Number(amount)
// 	});
// };

// export const allItems = async () => {
// 	let items = [];

// 	const querySnapshot = await getDocs(collection(db, 'ürünler'));
// 	querySnapshot.forEach((doc) => {
// 		items.push({ ...doc.data(), id: doc.id });
// 	});

// 	return items;
// };

// export const getBook = async (slug) => {
// 	const docRef = doc(db, 'books', slug);
// 	const docSnap = await getDoc(docRef);

// 	if (docSnap.exists()) {
// 		return docSnap.data();
// 	} else {
// 		// doc.data() will be undefined in this case
// 		console.log('No such document!');
// 	}
// };

// export const getItem = async (slug) => {
// 	let items = [];
// 	const itemsRef = collection(db, 'ürünler');

// 	// Create a query against the collection.
// 	const q = query(itemsRef, where('slug', '==', slug));

// 	const querySnapshot = await getDocs(q);
// 	querySnapshot.forEach((doc) => {
// 		// doc.data() is never undefined for query doc snapshots
// 		items.push({ ...doc.data(), id: doc.id });
// 	});

// 	return items[0];
// };

// export const addContent = async (slug, content, writer) => {
// 	return null;
// };

// export const approveProduct = async (id) => {
// 	const productRef = doc(db, 'ürünler', id);
// 	await updateDoc(productRef, {
// 		approved: true,
// 		approvedAt: Date.now()
// 	});
// };

// export const removeProduct = async (id) => {
// 	await deleteDoc(doc(db, 'ürünler', id));
// };

export const yorumlarıGetir = async (id) => {
	let yorumlar = [];

	const yorumlarRef = collection(db, 'yorumlar');
	const q = query(yorumlarRef, where('ürünId', '==', id));

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		yorumlar.push({ id: doc.id, ...doc.data() }); // yorumun kendine ait id'sidir.
	});

	return yorumlar;

	// const docRef = doc(db, 'yorumlar', id);
	// const docSnap = await getDoc(docRef);

	// if (docSnap.exists()) {
	// 	return { ...docSnap.data(), id };
	// } else {
	// 	console.log('Yorum bulunamadı...');
	// }
};
