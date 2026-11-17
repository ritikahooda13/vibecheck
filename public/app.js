const questions = {
  en: [
    {q:"Your group chat suddenly goes silent. You...",a:["Drop a random meme to revive it.","Read everything, say nothing.","Send a voice note like you own the place.","Check if everyone is okay."]},
    {q:"Your ideal weekend looks like...",a:["A spontaneous plan that becomes a story.","A peaceful day with my own company.","Main-character energy: outfit, photos, plans.","Good food and people I love."]},
    {q:"When plans get cancelled, you feel...",a:["Free! Time for a new chaotic plan.","Honestly, relieved.","A little disappointed — I was ready.","I'll make sure everyone is still good."]},
    {q:"Pick your natural superpower.",a:["Making boring moments unforgettable.","Noticing details others miss.","Bringing confidence into any room.","Making people feel included."]},
    {q:"At a party, you are usually...",a:["The one starting something unexpected.","Near the snacks, observing the scene.","Somehow in the centre of the action.","Checking that nobody feels left out."]},
    {q:"Your phone screen time is mostly...",a:["Memes, random searches and chaos.","Reading, watching and quietly exploring.","Creating, posting and capturing moments.","Messaging people and sharing good things."]},
    {q:"Choose a mood for today.",a:["Unpredictable but iconic.","Calm, quiet and focused.","Unstoppable. Watch me.","Soft heart, good energy."]},
    {q:"People usually come to you for...",a:["A fun idea or an impulsive plan.","A thoughtful perspective.","Motivation and confidence.","Comfort and honest support."]}
  ],
  hi: [
    {q:"आपका ग्रुप चैट अचानक शांत हो जाए, तो आप...",a:["कोई random meme भेजकर सबको जगा दूँगा।","सब पढ़ूँगा, लेकिन चुप रहूँगा।","ऐसा voice note भेजूँगा जैसे चैट मेरी हो।","सब ठीक हैं या नहीं, पूछूँगा।"]},
    {q:"आपका perfect weekend कैसा होगा?",a:["एक अचानक बना प्लान जो यादगार बन जाए।","शांति और अपना समय।","पूरा main-character feel: outfit, photos, plans।","अच्छा खाना और अपने लोग।"]},
    {q:"जब कोई प्लान cancel हो जाए, तो आप...",a:["खुश! अब कोई नया मज़ेदार प्लान।","सच कहूँ तो राहत मिलती है।","थोड़ा बुरा लगेगा, मैं तैयार था।","देखूँगा कि सब ठीक तो हैं।"]},
    {q:"अपनी natural superpower चुनें।",a:["बोरिंग पल को मज़ेदार बनाना।","वो बातें देखना जो दूसरों से छूट जाती हैं।","किसी भी जगह confidence लाना।","लोगों को अपनापन महसूस कराना।"]},
    {q:"किसी party में आप आमतौर पर...",a:["कुछ unexpected शुरू कर देता हूँ।","एक तरफ रहकर सब observe करता हूँ।","किसी तरह centre of attention बन जाता हूँ।","ध्यान रखता हूँ कि कोई अकेला न रहे।"]},
    {q:"आपके फोन का ज़्यादातर समय किसमें जाता है?",a:["Memes, random searches और मस्ती।","पढ़ने, देखने और चुपचाप explore करने में।","Create करने, post करने और moments capture करने में।","लोगों से बात करने और अच्छी चीज़ें share करने में।"]},
    {q:"आज का mood चुनें।",a:["थोड़ा unpredictable, लेकिन iconic।","शांत, focused और अपने में।","रुकना नहीं है, आज मेरा दिन है।","अच्छा दिल और positive energy।"]},
    {q:"लोग आमतौर पर आपके पास किसलिए आते हैं?",a:["मज़ेदार idea या अचानक बने plan के लिए।","एक समझदारी भरी राय के लिए।","Motivation और confidence के लिए।","सहारे और सच्ची सलाह के लिए।"]}
  ]
};
const outcomes = {
  chaos_creator:{emoji:"🎉",en:["THE CHAOS CREATOR","You bring the plot twists. Your energy is spontaneous, playful and impossible to ignore. You turn ordinary moments into stories people remember. Keep the fun alive — just remember to leave a little room for a plan."],hi:["द कैओस क्रिएटर","आपकी energy spontaneous और मज़ेदार है। आप साधारण पलों को भी ऐसी यादों में बदल देते हैं जिन्हें लोग याद रखते हैं। मस्ती बनाए रखें — बस कभी-कभी थोड़ा plan भी कर लें।"]},
  quiet_observer:{emoji:"🦉",en:["THE QUIET OBSERVER","You notice what others miss. Thoughtful, calm and quietly curious, you don't need to be the loudest person in the room to understand what's happening. Your perspective is your superpower."],hi:["द क्वाइट ऑब्ज़र्वर","आप वो बातें भी notice करते हैं जो दूसरों से छूट जाती हैं। आप शांत, समझदार और curious हैं। सबसे तेज़ आवाज़ होना ज़रूरी नहीं — आपकी observation ही आपकी ताकत है।"]},
  main_character:{emoji:"🚀",en:["THE MAIN CHARACTER","You bring presence wherever you go. Bold, expressive and full of momentum, you like making things happen instead of waiting around. Own your confidence and make space for others to shine too."],hi:["द मेन कैरेक्टर","आप जहाँ जाते हैं, अपनी presence छोड़ते हैं। आप confident, expressive और action लेने वाले इंसान हैं। अपने confidence को अपनाएँ और दूसरों को भी shine करने का मौका दें।"]},
  good_vibes:{emoji:"💜",en:["THE GOOD VIBES SOUL","You make people feel seen. Warm, supportive and genuinely thoughtful, you bring a sense of comfort to the people around you. Your kindness is not small — it changes the mood of a room."],hi:["द गुड वाइब्स सोल","आप लोगों को अपनापन महसूस कराते हैं। आप caring, supportive और दिल से thoughtful हैं। आपकी kindness छोटी बात नहीं — यह पूरे माहौल को बेहतर बना सकती है।"]}
};
const copy = {
  en:{about:"About",eyebrow:"YOUR PERSONALITY, DECODED",heroTitle:'What’s your<br><span class="gradient-text">internet vibe?</span>',heroCopy:"A few fun questions. One surprisingly accurate vibe. Find out what energy you bring to the internet.",start:"Discover my vibe",microcopy:"No sign-up. Just vibes.",back:"← Back",selectNote:"Choose the answer that feels most like you.",resultKicker:"YOUR VIBE IS IN",resultLabel:"YOU ARE",share:"Share my result",retry:"Take it again",aboutTitle:"A little self-discovery, a lot of fun.",aboutCopy:"VIBECHECK is a playful personality quiz. Your result is for entertainment, not a scientific assessment."},
  hi:{about:"जानें",eyebrow:"आपकी पर्सनैलिटी, अब decode होगी",heroTitle:'आपकी<br><span class="gradient-text">internet vibe क्या है?</span>',heroCopy:"कुछ मज़ेदार सवाल। एक दिलचस्प personality result। जानें कि internet पर आपकी energy कैसी है।",start:"मेरी vibe जानें",microcopy:"कोई sign-up नहीं। बस vibes।",back:"← वापस",selectNote:"वही जवाब चुनें जो आपके जैसा लगे।",resultKicker:"आपकी vibe मिल गई",resultLabel:"आप हैं",share:"अपना result share करें",retry:"फिर से खेलें",aboutTitle:"थोड़ी self-discovery, ढेर सारी मस्ती।",aboutCopy:"VIBECHECK एक मज़ेदार personality quiz है। इसका result मनोरंजन के लिए है, वैज्ञानिक assessment नहीं।"}
};
let lang="en", current=0, answers=[], lastResult=null;
const $=id=>document.getElementById(id);
function setLanguage(next){lang=next;document.documentElement.lang=lang;document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(copy[lang][key])el.innerHTML=copy[lang][key]});$("langToggle").textContent=lang==="en"?"हिन्दी":"English";if(!$("quiz").classList.contains("hidden"))renderQuestion();if(!$("result").classList.contains("hidden")&&lastResult)renderResult(lastResult,false);}
$("langToggle").addEventListener("click",()=>setLanguage(lang==="en"?"hi":"en"));
function show(section){["home","quiz","result"].forEach(id=>$(id).classList.toggle("hidden",id!==section));window.scrollTo({top:0,behavior:"smooth"});}
function start(){current=0;answers=[];show("quiz");renderQuestion();}
function renderQuestion(){const item=questions[lang][current];$("questionCounter").textContent=`QUESTION ${String(current+1).padStart(2,"0")} / 08`;$("progressBar").style.width=`${((current+1)/8)*100}%`;$("questionText").textContent=item.q;$("answers").innerHTML="";item.a.forEach((answer,index)=>{const btn=document.createElement("button");btn.className="answer-btn";btn.innerHTML=`<span>0${index+1}</span>${escapeHtml(answer)}`;btn.addEventListener("click",()=>choose(index));$("answers").appendChild(btn);});$("backBtn").style.visibility=current===0?"hidden":"visible";}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function choose(index){answers[current]=index;if(current<7){current++;renderQuestion();}else finish();}
function saveLocalHistory(resultId) {
  const history = JSON.parse(
    localStorage.getItem("vibecheck_history") || "[]"
  );

  history.unshift({
    result: resultId,
    date: new Date().toLocaleString()
  });

  localStorage.setItem(
    "vibecheck_history",
    JSON.stringify(history.slice(0, 50))
  );
}
function finish(){const scores=[0,0,0,0];answers.forEach((a)=>scores[a]++);const max=Math.max(...scores);let winner=scores.indexOf(max);if(scores.filter(x=>x===max).length>1)winner=answers[7];const ids=["chaos_creator","quiet_observer","main_character","good_vibes"];lastResult=ids[winner];renderResult(lastResult,true);}
function renderResult(id,save){const data=outcomes[id],detail=data[lang];$("resultEmoji").textContent=data.emoji;$("resultTitle").textContent=detail[0];$("resultDescription").textContent=detail[1];$("saveMessage").textContent="";show("result");if(save) {
  saveLocalHistory(id);
  saveResult(id);
}}
async function saveResult(id){const answerLog=answers.map((a,i)=>({question:questions[lang][i].q,answer:questions[lang][i].a[a]}));try{const r=await fetch("/api/quiz",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({resultType:id,language:lang,answers:answerLog})});if(!r.ok)throw new Error("save failed");$("saveMessage").textContent=lang==="en"?"Your result has been saved.":"आपका result save हो गया है।";}catch(e){$("saveMessage").textContent=lang==="en"?"Could not save right now. You can still share your result.":"अभी result save नहीं हो पाया, लेकिन आप इसे share कर सकते हैं।";}}
$("startBtn").addEventListener("click",start);
$("backBtn").addEventListener("click",()=>{if(current>0){current--;renderQuestion();}});
$("retryBtn").addEventListener("click",start);
$("shareBtn").addEventListener("click",async()=>{const name=outcomes[lastResult][lang][0];const message=lang==="en"?`I got ${name} on VIBECHECK! Discover your vibe too.`:`VIBECHECK पर मेरी vibe ${name} आई! आप भी अपनी vibe जानें।`;try{if(navigator.share)await navigator.share({title:"VIBECHECK",text:message,url:location.origin});else{await navigator.clipboard.writeText(message+" "+location.origin);$("saveMessage").textContent=lang==="en"?"Share text copied!":"Share text copy हो गया!";}}catch(e){}});
// MY VIBE DASHBOARD
function loadVibeDashboard() {
  const history = JSON.parse(
    localStorage.getItem("vibecheck_history") || "[]"
  );

  const total = document.getElementById("totalQuizzes");
  const top = document.getElementById("topVibe");
  const historyBox = document.getElementById("vibeHistory");

  if (!total || !top || !historyBox) return;

  total.textContent = history.length;

  if (history.length === 0) {
    top.textContent = "—";
    historyBox.textContent = "Take your first personality quiz!";
    return;
  }

  const counts = {};
  history.forEach(item => {
    counts[item.result] = (counts[item.result] || 0) + 1;
  });

  const best = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0];

  const names = {
    chaos_creator: "Chaos Creator",
    quiet_observer: "Quiet Observer",
    main_character: "Main Character",
    good_vibes: "Good Vibes"
  };

  top.textContent = names[best] || "Unknown";
  historyBox.innerHTML = "";

  history.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "leaderboard-item";

    const heading = document.createElement("h3");
    heading.textContent = `${index + 1}. ${names[item.result] || item.result}`;

    const date = document.createElement("p");
    date.textContent = item.date;

    card.append(heading, date);
    historyBox.appendChild(card);
  });
}

loadVibeDashboard();
