/*
Thi's
organizations/247943502148
folders/951960025600
*/
export const private_key = process.env.PRIVATE_KEY;
export const client_email = process.env.CLIENT_EMAIL;
export const folder_id = process.env.FOLDER_ID;
export const projectId = process.env.PROJECT_ID;
// export const organization_id = process.env.ORGANIZATION_ID;

/*
Ideta's
*/
// export const private_key = process.env.IDETA_PRIVATE_KEY;
// export const client_email = process.env.IDETA_CLIENT_EMAIL;
// export const folder_id = process.env.IDETA_FOLDER_ID;
// export const organization_id = process.env.IDETA_ORGANIZATION_ID;

export const parent = `folders/${folder_id}`;
// export const parent = `organizations/${organization_id}`;

export const credentials = { private_key, client_email }