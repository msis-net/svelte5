/**
 * 共通利用
 */
export class Common {
	static setFormData(id: string, data: string) {
		const element = document.getElementById(id) as HTMLInputElement;
		if (!element) return;
		element.value = data;
	}

	static setElementData(id: string, data: any) {
		const element = document.getElementById(id) as HTMLInputElement;
		if (!element) return;
		element.textContent = data;
	}

	static getAge(birthday: any, tgtday: any) {
		//console.log('birthday', birthday);
		//console.log('tgtday', tgtday);
		var thisYearsBirthday = new Date(
			tgtday.getFullYear(),
			birthday.getMonth() - 1,
			birthday.getDate()
		); //今年の誕生日
		//console.log('thisYearsBirthday', thisYearsBirthday);
		var age = tgtday.getFullYear() - birthday.getFullYear(); //年齢
		if (tgtday < thisYearsBirthday) {
			//今年まだ誕生日が来ていない
			age--;
		}
		return age;
	}

	static formatDateToJapaneseEra(dateStr: string): string {
		if (!dateStr) return '';
		const date = new Date(dateStr);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		let eraName = '';
		let eraYear = 0;

		if (year >= 2019) {
			eraName = '令和';
			eraYear = year - 2018;
		} else if (year >= 1989) {
			eraName = '平成';
			eraYear = year - 1988;
		}

		return `${eraName}${eraYear}年${month}月${day}日`;
	}

	static wareki(date: string) {
		const d = new Date(date);
		const wareki = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', { era: 'narrow' }).format(d); //nar
		//.Perform_Date = wareki.replace(/\//g, '.');
		return wareki.replace(/\//g, '.');
	}
}
