async function handleGetRequest(request) {
    try {
        const response = await fetch(request);
        const responseClone = response.clone();
        if (responseClone.status == 200) {
            const data = await responseClone.json();
            await remoteCache.destroy();
            remoteCache = new this.PouchDB('remote-cache');
            await Promise.all(data.map(form => {
                return { _id: form.id, ...form };
            }).map(async (form) => {
                try {
                    const result = await remoteCache.put(form);
                    console.log('INSERT FORM', result);
                } catch (error) {
                    if (error.name == 'conflict') {
                        console.log('CONFLICT FORM', error);
                        try {
                            const doc = await remoteCache.get(form._id);
                            console.log('UPDATE FORM', await remoteCache.put({ ...form, ...doc }));
                        } catch (error) {
                            console.log('UPDATE FORM ERROR', error);
                            throw error;
                        }
                    } else {
                        console.log('INSERT FORM ERROR', error);
                        throw error;
                    }
                }
            }));
        }
        return response;
    } catch (error) {
        console.info('FETCH FROM CACHE');
        try {
            const result = await remoteCache.allDocs({
                include_docs: true, // otherwise only id and revision is returned
                attachments: true // include attachments as base64
            });
            return new Response(JSON.stringify(result.rows.map(row => row.doc)), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                ok: true
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

async function handlePostRequest(request) {
    const requestClone = request.clone();
    try {
        const response = await fetch(request);
        const responseClone = response.clone();
        if (responseClone.status == 200) {
            return response;
        }
        return response;
    } catch (error) {
        console.info('POST TO CACHE');
        try {
            const formData = await requestClone.json();
            const result = await pendingCache.post(formData);
            // Respond with a body similar to that of the real backend
            return new Response(JSON.stringify(formData), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                ok: true
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}