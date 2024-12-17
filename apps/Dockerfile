FROM node:22.12.0

# 作業ディレクトリを設定
WORKDIR /app

# 必要なファイルをコピー
COPY package*.json ./
COPY build ./build

# 必要な依存関係をインストール
RUN npm install --production

# アプリケーションを起動
CMD ["node", "build"]
