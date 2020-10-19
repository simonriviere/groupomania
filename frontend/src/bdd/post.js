export function Post(data, url) {

 fetch(url, {
   method: "POST", 
   headers: {
     "Content-Type": "application/json" 
   },
   body: data
})
.then(result => result.json())
.then(result => localStorage.setItem('token', result.token))
}

 
export async function allArticles(url) {
   let response = await fetch('http://localhost:3000/api/articles',{
      method : 'GET',
      headers : {  
        'Content-Type': 'application/json',
         'Authorization': 'token ' + localStorage.getItem('token'),    
      }
   })
   if (response.ok) { 
      let articles = await response.json()
      console.log(articles)
   } else {
      console.error('Retour du server : ', response.status)
   }

}
allArticles('http://localhost:3000/api/articles')
