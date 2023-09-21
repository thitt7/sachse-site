'use server'

import clientPromise from '@/lib/mongodb';
import { redirect } from 'next/navigation';

async function submit(formData: FormData) {
  const client = await clientPromise;
  console.log('MONGOCLIENT: ',client)
  const db = client.db("sachse-site");
  const emails = db.collection("emails");

  let entry = {}

  for (const [i, v] of formData.entries()) {
    if (i.substring(0,10) == '$ACTION_ID') {continue;}
    entry = {...entry, [i]: v}
  }

  const filter = { email: (entry as { email: string }).email };
  const existingDoc = await emails.findOne(filter);
  const updateDoc = { $set: entry };
  const options = {upsert: true};
  const updatedDoc = { ...existingDoc};

  let doc;
  if (!existingDoc) {
      doc = await emails.updateOne(filter, updateDoc, options)
  }
  else {
      doc = await emails.replaceOne(filter, entry)
  }

  if (doc!.acknowledged) {
    redirect('/?form=success')
  }

  }

export default submit;