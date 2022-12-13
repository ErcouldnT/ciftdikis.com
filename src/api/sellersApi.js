import {
	collection,
	query,
	where,
	// doc,
	// setDoc,
	addDoc,
	// getDoc,
	getDocs
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

	const querySnapshot = await getDocs(collection(db, 'satıcılar'));
	querySnapshot.forEach((doc) => {
		items.push(doc.data());
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

export const getSeller = async (email) => {
	let items = [];
	const itemsRef = collection(db, 'satıcılar');

	// Create a query against the collection.
	const q = query(itemsRef, where('email', '==', email));

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		items.push(doc.data());
	});

	return items[0];
};
