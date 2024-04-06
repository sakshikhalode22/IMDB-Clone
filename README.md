# IMDB-Clone
IMDB-Clone is the most popular and authoritative source for movie and TV shows. Find rating on this website.

# npm install
# npm run dev

`API`
TMDB api
This developer db site provide api's for movies. There are some get and post api's for different commands.
https://developer.themoviedb.org/reference/intro/getting-started

`Tailwind CSS`
Tailwind CSS is a utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.

`useContext hook`
React Context is a way to manage state globally.
Context provides a way to pass data or state through the component tree without having to pass props down manually through each nested component. It is designed to share data that can be considered as global data for a tree of React components, such as the current authenticated user or theme(e.g. color, paddings, margins, font-sizes).

Context API uses Context. Provider and Context. Consumer Components pass down the data but it is very cumbersome to write the long functional code to use this Context API. So useContext hook helps to make the code more readable, less verbose and removes the need to introduce Consumer Component. 

`React.memo()`
This can help to prevent unneccessary rendering which happened in all compnent 
for example
there are three component 
1:count
2:incereaseAge (increament button)
3:increaseSalary(increament button)
both 2,3 reusing component 1
so when age is changing all three are rendering
to overcome this issue use `export default React.memo(CName)`

`useCallback`
Same above example there are two function in App for increasing age and increasing salary
when age is increasing both the function getting rendered
to overcome this issue use `useCallback` hook with it's dependancy
syntax
const ageIncrease=useCallback(()=>{
//functionality
},[age])
It will help to reduce rerendering and only render that specific function which is in use. such that to increase age only ageIncrease will be called.

PS: `useCallback` caches full function

`useMemo`
If there is heavy and complex function
ex const isEven=()=>{
    for(let i=1; i<20000000; i++);
    return 2%2===0
}

isEven()?even:odd

here return function will be delayed due to for loop and also other functionality will get delayed

use useMemo which have return value
const isEven=useMemo(()=>{
    for(let i=1; i<20000000; i++);
    return counter%2===0
},[counter])

isEven?even:odd  // it is not a fuction now so while using this use without ()

here other functionalities will not get delays which doesn't have this dependancy
PS: `useMemo` caches only return value


`useRef`
const [name. setName]=useState("")
# ref element
const refElement=useRef()  // make DOM properties work here     
console.log(refElement) //{current:''} //{current:input}
const clear=()=>{
    setName("")
    <!-- I want my current object to be focused not shift -->
    refElement.current.focus()
}
return(
    <>
    <input rf={refElement} type="text" value={name} onChange={(e)=>setName(e.target.value)}
    <button onClick={clear}>Clear</button>
    </>
)

Initially if I clicked on input focus was on input and if clicked on button focus was on button and input gets unfocused. 
Now if I clicked on input and then button both can be in focused
which increase user experiance
It can help to change style element such color size `refElement.current.style.color='red'`

