class App extends Zye {
  render() {
    return Zye.createElement("main", {}, [
      Zye.createElement("div", {}, [
        Zye.createElement("div", {}, [
          Zye.createElement("h1", {}, "hello world")
        ])
      ])
    ]);
  }
}

Zye.createApp(new App(), document.getElementById("app"));
