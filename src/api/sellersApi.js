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
	deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';

// Change this to set()
export const sellerCreator = async (email) => {
	try {
		const docRef = await addDoc(collection(db, 'satıcılar'), {
			email
		});
		console.log('Satıcı kaydedildi: ', docRef.id);
	} catch (e) {
		console.error('Satıcı kaydı başarısız: ', e);
	}
};

export const allSellers = async () => {
	let items = [];

	const data = await getDocs(collection(db, 'satıcılar'));
	data.forEach((doc) => {
		items.push({ ...doc.data(), id: doc.id });
	});

	// data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

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

// TODO: id bazlı sorgulama yaz.
export const getSeller = async (email) => {
	let items = [];
	const itemsRef = collection(db, 'satıcılar');

	// Create a query against the collection.
	const q = query(itemsRef, where('email', '==', email));

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		items.push({ ...doc.data(), id: doc.id });
	});

	return items[0];
};

export const removeSeller = async (id) => {
	await deleteDoc(doc(db, 'satıcılar', id));
};

export const satıcıİsteğiGönder = async (storeName, address, vergiNo, city, email) => {
	try {
		const docRef = await addDoc(collection(db, 'satıcı-istekleri'), {
			storeName,
			address,
			vergiNo,
			city,
			email,
			approved: false,
		});
		console.log('Satıcı isteği gönderildi: ', docRef.id);
	} catch (e) {
		console.error('Satıcı isteği başarısız: ', e);
	}
};

export const satıcıİstekleriniGetir = async () => {
	let items = [];

	const data = await getDocs(collection(db, 'satıcı-istekleri'));
	data.forEach((doc) => {
		items.push({ ...doc.data(), id: doc.id });
	});

	// data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

	return items;
};
