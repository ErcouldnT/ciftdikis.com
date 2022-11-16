import {
	collection,
	query,
	where,
	// doc,
	// setDoc,
	addDoc,
	// getDoc,
	getDocs,
	serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

// Change this to set()
export const bookCreator = async ({ slug, title, desc, creator }) => {
	try {
		const docRef = await addDoc(collection(db, 'books'), {
			slug,
			title,
			desc,
			creator,
			createdAt: serverTimestamp(),
			content: []
		});
		console.log('Book written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding book: ', e);
	}
};

export const allBooks = async () => {
	let books = [];

	const querySnapshot = await getDocs(collection(db, 'books'));
	querySnapshot.forEach((doc) => {
		books.push(doc.data());
	});

	return books;
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

export const getBook = async (slug) => {
	let books = [];
	const booksRef = collection(db, 'books');

	// Create a query against the collection.
	const q = query(booksRef, where('slug', '==', slug));

	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		books.push(doc.data());
	});

	return books[0];
};

export const addContent = async (slug, content, writer) => {
	return null;
};
