import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import ListItem from "./compornents/ListItem";
import dummyArticles from "./dummies/articles";
import Constants from "expo-constants";
import axios from "axios";

const URL = `http://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`;
//テンプレート文字列を使っている

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
  itemContainer: {
    height: 100,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    flexDirection: "row", //defaultはcolumn
  },
  leftContainer: {
    //backgroundColor: 'red',
    width: 100,
  },
  rightContainer: {
    //backgroundColor: 'blue',
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
  subText: {
    fontSize: 12,
    color: "gray",
  },
});

export default function App() {
  /**  const items = articles.map((article, index) => {
    return (
      <ListItem
        imageUrl={article.urlToImage}
        title={article.title}
        author={article.author}
        key={index}
        //keyを忘れずに
      />
    );
  }); */
  const [articles, setArticles] = useState([]);
  //ststeを使う
  //useStateの引数はstate(ここではarticles)の初期値
  useEffect(() => {
    fetchArticles();

    //alert(Constants.manifest.extra.newsApiKey);
    //app.jsonのextraを使って、NewsAPIのAPIKeyを仕込む
    /*const timer = setTimeout(() => {
      setArticles(dummyArticles);
    }, 2000);
    return () => clearTimeout(timer);*/
    //コンポーネントがアンマウントされるときにクリーンアップが必要な場合は、
    //returnでクリーンアップ関数を返す
  }, []);
  //useEffectを使う
  //useEffectの第２引数の配列に書いた変数が変化したときだけ、第１引数の関数が動く
  //空入れるにすると、最初に読み込まれた１回だけ処理される。

  const fetchArticles = async () => {
    //axiosでAPIを実行
    try {
      const response = await axios.get(URL);
      setArticles(response.data.articles);
      //console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {
        //<View>はReact-nativeが標準で提供するコンポーネント。Htmlのdivタグみたいなもの
        //SafeAreaViewを使うと、上下に余白ができる（iPhone11とかのM字の部分）
      }

      <FlatList //FlatListで一覧がスワイプできるようになる
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
