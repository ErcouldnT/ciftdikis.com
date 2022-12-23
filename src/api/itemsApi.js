import {
	collection,
	query,
	where,
	// doc,
	// setDoc,
	addDoc,
	// getDoc,
	getDocs,
	doc,
	updateDoc,
	deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';

// Change this to set()
export const itemCreator = async (
	approved,
	slug,
	category,
	productName,
	desc,
	seller,
	price,
	imgLink,
	tags
) => {
	try {
		const docRef = await addDoc(collection(db, 'ürünler'), {
			approved,
			slug,
			category,
			productName,
			desc,
			seller,
			price: Number(price),
			imgLink,
			createdAt: Date.now(),
			comments: [],
			tags
		});
		console.log('Ürün kaydedildi: ', docRef.id);
	} catch (e) {
		console.error('Ürün kaydı başarısız: ', e);
	}
};

export const allItems = async () => {
	let items = [];

	const querySnapshot = await getDocs(collection(db, 'ürünler'));
	querySnapshot.forEach((doc) => {
		items.push({ ...doc.data(), id: doc.id });
	});

	return items;
};

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

export const getItem = async (slug) => {
	let items = [];
	const itemsRef = collection(db, 'ürünler');

	// Create a query against the collection.
	const q = query(itemsRef, where('slug', '==', slug));

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		items.push({ ...doc.data(), id: doc.id });
	});

	return items[0];
};

// export const addContent = async (slug, content, writer) => {
// 	return null;
// };

export const approveProduct = async (id) => {
	const productRef = doc(db, 'ürünler', id);
	await updateDoc(productRef, {
		approved: true,
		approvedAt: Date.now()
	});
};

export const removeProduct = async (id) => {
	await deleteDoc(doc(db, 'ürünler', id));
};
