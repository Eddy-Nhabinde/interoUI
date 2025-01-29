//Esta funcao converte as crendeciais do usuario para base64 antes de fazer o login

const base64Enconder = (username, password) => {
    const encodedString = Buffer.from(username+':'+password).toString('base64');
    return encodedString
}

export {base64Enconder}