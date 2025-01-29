
### Antes de correr a applicação actualize o .env com o token e a base url

---
#### `Chart.js` bug\issues(~~Resolvido~~)

```
useEffect(()=>{
   new Chart(ref.current,config);
},[data])
```

No código acima pretende-se instanciar um chart para representação e amostra de dados, porém<br/>
este tem incosistencias, pois uma nova instancia do chart é criada sempre que o useEffect<br/>
é executado trazendo dados duplicados das instâncias anteriores. 


```
const[chartInstace, setChartInstance] = useState(null)

useEffect(() => {
    if(data){
      if(!chartInstace){
        var chart = new Chart(ref.current,config);
        setChartInstance(chart);
      }else{
        chartInstace.data = data;
        chartInstace.update()
      }
    }
  }, [data]);
```

Para solucionar o problema acima, criou-se um estado que ira receber uma instância logo que<br/> 
esta for criada e sempre que o useEffect é executado verifica-se antes se uma instancia ja<br/>
existe e ai so faz-se update dos dados, caso não, ela é criada e passada ao estado.




