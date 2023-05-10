const fs = require('fs');
const path = require('path');
const axios = require('axios');

const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJyZXR0ZXIuaW8iLCJpYXQiOjE1MTYyMzkwMjJ9.YGfFnZYogAak8ocfjW2Gkslxgj7p0nl03L9XYBb-hbI"
const API_URL = "http://localhost:3000/api/importDoc"
const docRootPath = '/Users/baranbaygan/Projects/rio/docs/doc_uploader/ai-docs'

let fileCount = 0

// Function to read all *.md files in a folder recursively
async function readMarkdownFiles(folderPath) {
    try {
        const files = await fs.promises.readdir(folderPath, { withFileTypes: true });

        for (const file of files) {
            if (file.isDirectory()) {
                await readMarkdownFiles(path.join(folderPath, file.name));
            } else if (file.isFile() && path.extname(file.name) === '.md') {
                const filePath = path.join(folderPath, file.name);
                const fileContent = await fs.promises.readFile(filePath, 'utf8');

                // File id is the path of the file relative to the folderPath.
                // Remove the first '/' and replace other '/' with '_'
                const fileId = filePath
                    .replace(docRootPath, '')
                    .replace(/^\//, '')
                    .replace(/\//g, '_');

                // if(fileId !== 'overview.md') {
                //     continue
                // }
                    
                await uploadToApi(fileId, filePath, fileContent);
            }
        }

        console.log(`Successfully uploaded ${fileCount} files to API`);
    } catch (error) {
        console.error('Error reading files:', error);
    }
}

// Function to upload file content to an API using Axios
async function uploadToApi(fileId, filePath, fileContent) {
    try {
        fileCount++
        console.log(`Uploading ${fileId} to API...`);

        // Post to API with JWT_TOKEN in x-api-key header
        const response = await axios.post(API_URL, {
            // File id is the full path of the file. Just replace '/' with '_'
            "id": fileId.replace(/\//g, '_'),
            // Title is file name
            "title": path.basename(filePath, '.md'),
            // Content is the file content
            "content": fileContent,
            
            "subdomain": "doc",

            "url": "https://www.retter.io",

            "type": "md"
        }, {
            headers: {
                'x-api-token': JWT_TOKEN
            }
        });


        
        // console.log(`Successfully uploaded ${filePath}:`, response.data);

    } catch (error) {
        console.error(`Error uploading ${filePath} to API:`, error);
    }
}

// Replace 'path/to/folder' with the path to the folder you want to read
readMarkdownFiles(docRootPath);

// Read the overview.md file and stringify it
// const file = fs.readFileSync(docRootPath + '/docs/overview.md', 'utf8')

// console.log(JSON.stringify(file))




