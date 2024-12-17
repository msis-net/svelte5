/**
 * Windowsのみ接続可、macOSではエラーになる（sftpの利用を検討）
 */
import { json } from '@sveltejs/kit';
import smb2 from '@awo00/smb2';
export async function POST({ request }: any) {
	const data = await request.json();
	console.log('data', data);
	console.log('/api/smb');

	const domain = '';
	const username = 'user';
	const password = 'Msis0616';
	const client = new smb2.Client('192.168.1.188');
	const session = await client.authenticate({
		domain,
		username,
		password
	});
	const tree = await session.connectTree('oqs');

	const entries = await tree.readDirectory('/');
	console.log(entries);

	const unwatch = await tree.watch((response) => {
		console.log('changed', response.data);
	});

	const directoryName = '.';
	//ディレクトリ作成：注：複数階層の作成(mkDirs)の様な事はできない
	/*
	if (!(await tree.exists(directoryName))) await tree.createDirectory(directoryName);
	console.log('directory content', await tree.readDirectory(directoryName));
	*/
	//ディレクトリ削除
	/*
	setTimeout(async () => {
      try {
        await tree.removeDirectory(directoryName);
      } catch (err) {
        console.error("failed remove dir", err);
      }
    }, 5 * 1000);
	*/

	//ファイル確認
	const filename = 'file.txt';
	if (!(await tree.exists(`${directoryName}/${filename}`)))
		await tree.createFile(`${directoryName}/${filename}`, '1234');
	console.log('file content', (await tree.readFile(`${directoryName}/${filename}`)).toString());

	//ファイル削除
	/*
	setTimeout(async () => {
		try {
			await tree.removeFile(`${directoryName}/${filename}`);
		} catch (err) {
			console.error('failed remove file', err);
		}
	}, 3 * 1000);*/

	//ファイル作成
	if (!(await tree.exists(`${directoryName}/${filename}`)))
		await tree.createFile(`${directoryName}/${filename}`, '1234');
	console.log('file content', (await tree.readFile(`${directoryName}/${filename}`)).toString());

	if (!(await tree.exists(`${directoryName}/${filename}`)))
		await tree.createFile(`${directoryName}/${filename}`, '1234');
	console.log('file content', (await tree.readFile(`${directoryName}/${filename}`)).toString());

	setTimeout(async () => {
		await unwatch();
		console.log('no longer watching');

		await client.close();
		console.log('client closed');
	}, 8 * 1000);

	return json({
		success: true,
		specimens: data
	});
}

/**


 */
