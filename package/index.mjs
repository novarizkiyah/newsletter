import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    const { name, email, message } = JSON.parse(event.body);
    const params = {
        TableName: 'Contacts',
        Item: {
            id: Date.now().toString(),
            name: name,
            email: email,
            message: message
        }
    };
    
    try {
        await docClient.send(new PutCommand(params));
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Contact saved successfully' }),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to save contact' }),
        };
    }
};