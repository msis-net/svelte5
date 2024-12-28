/**
 * getPatient
 * odata経由でAD_ORCAのpatientmodを実行
 */
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

export async function POST({ request }: RequestEvent) {
	try {
		// FormDataを直接取得
		const formData = await request.formData();
		const formDataObject: { [key: string]: string } = {};
		console.log(formDataObject);

		const file = formData.get('file');
		if (file instanceof File) {
			const fileBuffer = Buffer.from(await file.arrayBuffer());
			const uploadDir = path.resolve('static/cert');
			const filePath = path.join(uploadDir, file.name);
			// アップロードディレクトリが存在しない場合は作成
			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir, { recursive: true });
			}
			await writeFile(filePath, fileBuffer);

			// config.jsonにfile.nameを追記
			const key = formData.get('key');
			const configPath = path.join(process.cwd(), 'static', 'config.json');
			const existingConfig = fs.existsSync(configPath)
				? JSON.parse(fs.readFileSync(configPath, 'utf8'))
				: {};
			existingConfig[key as string] = file.name;
			await writeFile(configPath, JSON.stringify(existingConfig, null, 2));
			return json({ 'File not found': 'File saved successfully' });
		} else {
			// FormDataの値をオブジェクトに変換
			// Check if 'delete' exists in formData
			if (formData.has('delete')) {
				console.log("formData['delete']", formData.get('delete'));
				const uploadDir = path.resolve('static/cert');
				const fileToDelete = formData.get('delete')?.toString();
				if (fileToDelete) {
					const filePath = path.join(uploadDir, fileToDelete);
					if (fs.existsSync(filePath)) {
						fs.unlinkSync(filePath);
						console.log(`{ "Deleted file": ${filePath}}`);
						// config.jsonにfile.nameを削除
						const key = formData.get('key');
						const configPath = path.join(process.cwd(), 'static', 'config.json');
						const existingConfig = fs.existsSync(configPath)
							? JSON.parse(fs.readFileSync(configPath, 'utf8'))
							: {};
						existingConfig[key as string] = '';
						await writeFile(configPath, JSON.stringify(existingConfig, null, 2));

						return json({ message: 'formData saved successfully' });
					} else {
						console.log(`File not found: ${filePath}`);
						return json({ 'File not found': `'${filePath}'` });
					}
				}
			} else {
				formData.forEach((value, key) => {
					formDataObject[key] = value.toString();
				});

				// static/config.jsonファイルに書き出し
				const configPath = path.join(process.cwd(), 'static', 'config.json');
				console.log(configPath);
				await writeFile(configPath, JSON.stringify(formDataObject, null, 2));
				return json({ message: 'formData saved successfully' });
			}
		}
	} catch (error) {
		console.error('Error in POST handler:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}

// 設定ファイルの読み込みを安全に行う関数
const safeLoadConfig = (path: any, finename: any) => {
	try {
		const configPath = path.join(process.cwd(), path, finename);
		if (!fs.existsSync(configPath)) {
			return {};
		}
		/*const content = fs.readFileSync(configPath, 'utf8');

		if (!content.trim()) {
			return {};
		}
		*/
		const existingConfig = fs.existsSync(configPath)
			? JSON.parse(fs.readFileSync(configPath, 'utf8'))
			: {};

		return existingConfig;
	} catch (error) {
		console.warn('Config file read error:', error);
		return {};
	}
};

// 設定ファイルの保存を安全に行う関数
const safeSaveConfig = async (config: any) => {
	try {
		const configPath = path.join(process.cwd(), 'static', 'config.json');
		const configDir = path.dirname(configPath);

		if (!fs.existsSync(configDir)) {
			fs.mkdirSync(configDir, { recursive: true });
		}

		await writeFile(configPath, JSON.stringify(config, null, 2));
		return true;
	} catch (error) {
		console.error('Config file write error:', error);
		return false;
	}
};
