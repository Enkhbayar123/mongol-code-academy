import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Load service account JSON key
const serviceAccount = JSON.parse(
  readFileSync('./serviceAccountKey.json', 'utf8')
);

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth(app);
const db = getFirestore(app);

async function flagTegshuhaanUsers() {
  try {
    const listUsersResult = await auth.listUsers();
    let updatedCount = 0;

    for (const user of listUsersResult.users) {
      if (user.email && user.email.endsWith('@tegshuhaan.mn')) {
        await db.collection('users').doc(user.uid).set(
          { mustChangePassword: true },
          { merge: true }
        );
        console.log(`Flagged: ${user.email} (${user.uid})`);
        updatedCount++;
      }
    }

    console.log(`\nSuccessfully updated ${updatedCount} users.`);
  } catch (error) {
    console.error('Error updating users:', error);
  }
}

flagTegshuhaanUsers();