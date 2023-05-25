// ------ program tree implementation with classes ------

class Node {
	constructor(essay, preview, emoji, paragraph = true) {
		this.essay = essay;
		this.preview = preview;
		this.emoji = emoji;
		this.paragraph = paragraph;
		this.descendants = [];
	}
}

class Result {
	constructor(essay, title, preview, emoji, image) {
		this.essay = essay;
		this.title = title;
		this.preview = preview;
		this.emoji = emoji;
		this.image = image;
	}
}

// ------ program dynamic webpage with functionality ------

var essay = "" // this is an accumulator of text to collect the essay content

const start = new Node("A \"dream school\" is the preferred university of an American high schooler. \
	What differentiates a dream school from any other university is the ferocity with which a student \
	pursues admission to their dream school \u2014 while a student may like a number of schools, the dream \
	school is an object of pure obsession, and it shapes the way a student approaches, applies to, and \
	attends college. The American university is inherently multifaceted, and while students often consider \
	a number of factors in determining their dream schools, ",
	null,
	null); // note: em dash is coded as \u2014

function init() {
	// begin the essay
	essay += start.essay;
	document.getElementById("finishedText").innerText = essay;
	start.descendants.forEach(createChoice)
}

function next(n) {
	document.getElementById("choices").innerHTML = "";
	if (n instanceof Result) {
		// display the results
		document.getElementById("choices").innerHTML = "<hr />";
		resultDiv = document.createElement("div")
		resultDiv.setAttribute("class", "container")
		document.getElementById("choices").append(resultDiv)
		resultDiv.innerHTML = "<p> <i><strong> Your dream school match... </strong></i> </p> <div class='row'>\
			<div class='col-sm-3'> <img src='images/" + n.image + "' alt='Your college logo' /> </div>\
			<div class='col-sm-9'>\
			<h1> " + n.emoji + " " + n.title + " </h1>\
			<p> " + n.essay + " </p> \
			</div> </div>";
	}
	else {
		// add new essay text
		essay += n.preview;
		if (n.paragraph) {
			essay += "\n\n";
		} else {
			essay += " ";
		}
		essay += n.essay;
		// reset options
		n.descendants.forEach(createChoice);
	}
	document.getElementById("finishedText").innerText = essay;
}

function createChoice(n) {
	// get container where code will be added
	choiceContainer = document.getElementById("choices");
	// create elements
	const div = document.createElement("div");
	div.setAttribute("class", "choiceContainer");
	const a = document.createElement("a");
	a.setAttribute("class", "choice");
	const emoji = document.createTextNode(n.emoji + " ")
	const choiceText = document.createTextNode(n.preview)
	// append elements
	a.appendChild(choiceText)
	div.appendChild(emoji)
	div.appendChild(a)
	// add click event 
	div.addEventListener('click', function(){ next(n);}, false);
	// display
	choiceContainer.appendChild(div)
}

// ------ code nodes ------
// In this block, create essay chunks and immediately assign them to their trees.

// page one
const academic = new Node(
	"Considering that going to college is the natural progression of one's education, and that universities are \
		centered around academic motives, the fact that students choose where to attend universities based on their \
		academic interests is not a surprise. What's different about college is the amount of academic opportunity \
		that presents itself to college students. For the first time, students are finally surrounded by experts in \
		practically everything, presenting a unique opportunity to pursue ",
	"they are primarily motivated by a university's academic offerings.",
	"\u{1F34E}"); // apple emoji
const degreeValue = new Node(
	"In Das Kapital, Karl Marx defined \"commodity fetishism\" \u2014 if a bit of an oversimplification \
		\u2014 as the result of when the exchange value of a commodity, what it can be bought and sold for, \
		marginalizes its use value, the actual utility presented by a good. In a capitalist economy, he argues, \
		we tend not to see finished products as products of labor, but mere price tags, which alienates humans \
		from the humanity of most everything around us. \n\n\
		In a Marxist sense, college education has become a commodity. Each degree has its exchange value \u2014 \
		the potential salary enabled by a job in its field \u2014 and this exchange value easily dominates \"use value\" \
		in the context of degree selection. ",
	"the value of their potential degree is the most important pull.",
	"\u{1F4B0}"); // money bag emoji
const studentLife = new Node(
	"Nobody else colleges the way Americans college. The American college experience, when observed from an international \
	lens, seems absolutely wild. College is much more than an education \u2014  it's an entire stage of one's life, and \
	while a student attends, it defines how they eat, sleep, and recreate. Where you go is not just a school \u2014 it's \
	something that defines a student before they apply to college, when they attend college, and even far after they \
	graduate, at least for some. It's possible that American universities have lost sight of what being a university is. \
	The idiosyncrasy of American tertiary education ",
	"student life plays a disproportionate role in drawing students to any particular school.",
	"\u{1F37B}"); // beers emoji
start.descendants.push(academic, degreeValue, studentLife)

// student life branches (shortest path)
const abroadBetter = new Node(
	"American college is weird. The schools themselves seem like they don't have their priorities straight: why would a \
		research university invest millions of dollars into its dorm amenities or football stadium? Schools in the United States \
		don't seem to really care about education when it comes to attracting new students. While obnoxious displays of school \
		spirit may be appealing to some, to others, they seem almost cult-like. (Look to Texas A&M for an example of these traditions \
		on steroids.) Greek life is yet another unfathomable tradition, even to some Americans themselves \u2014 the viral \
		nature of \"rush TikTok\" in the American South is a testament to just how strange Greek life and its consequent social \
		stratification actually is. The negative impacts of Greek life are compounded by American college drinking culture \u2014 \
		while many European countries let students drink by the time they're college-aged, making it into a normal activity \
		divorced from college social life, Americans cannot drink until they're 21, meaning that social spaces where they can \
		get their hands on alcohol \u2014 like fraternities and sororities \u2014 become social spaces rife with problem drinking \
		and its consequences. Fraternities are hotspots for sexual violence. Despite all of this, people still defend Greek life \
		vehemently \u2014 it's a part of the process; it facilitates bonding; it's ingrained in university culture. With such an \
		obsession with \"student life\" and \"the college experience,\" it's no wonder that many American students make their \
		actual education a second priority in college.",
	"is a real downside.",
	"\u{1F6EB}" // plane departing emoji
);
const abroadResult = new Result(
	"You don't need a football team and a set of Greek letters to achieve your educational goals. You're going to college to be \
		a student, not to re-engage in the worst side of high school social life on steroids, and the best place to do that is outside \
		the country. Whether you end up just north in Canada or across the Atlantic in Europe, your college experience will be very \
		different from that of your classmates, but that might just be for the better. (Airfare included, it also might end up cheaper!)",
	"The Study Abroad",
	"You've matched with your college(s)! Click to discover your dream school...",
	"\u{1F6C2}", // passport control emoji
	"european.png"
);
abroadBetter.descendants.push(abroadResult);
const usaBetter = new Node(
	"America's college culture is truly one-of-a-kind, yes, and that's good. The primary argument that Americans are doing it \
		wrong is that college is supposed to be about education, but such an argument looks at education in a soulless, sterile \
		way. Take on-campus dorms \u2014 integral to any American's time in college, dorms are absent in plenty of European \
		countries, where students may simply live in typical apartments as anyone else would. The dorm is advantageous just as \
		the campus is advantageous: in a space geared towards learning, it can happen anywhere, be it inside or outside of the \
		classroom. Proponents of a European-style system almost view education as something that can occur in isolation, \
		without camaraderie, spirit, or interpersonal connection, football games and late-night lounge studying be damned. \
		Even partying, with its rambunctious vices, ought to be excused a little: why shouldn't students have fun? \
		\n\nCollege is the first taste of independence for most American students, and going into college, education isn't \
		the thing that's changing \u2014 the rest of their life is changing. Matriculating freshmen have been going to classes \
		for the past decade. For the past decade, they've also been under the watchful eyes of their parents. College students \
		will naturally explore, and they ought to be free to try new things, meet new people, and make mistakes. Ideally, \
		they'll have a blast doing it.",
	"should be celebrated!",
	"\u{1F3C8}" // american football emoji
);
const partyResult = new Result(
	"You know how to have fun. In college, that's exactly what you're going to do. These are the best four years of your life, \
		and you're going to live them up. Good for you. What more needs to be said?",
	"The Party School",
	"You've matched with your college(s)! Click to discover your dream school...",
	"\u{1F57A}", // disco dancer emoji
	"top50.png" // this image is from barstool and has byu and liberty on it... but im not making my own graphics here
);
usaBetter.descendants.push(partyResult);
studentLife.descendants.push(abroadBetter, usaBetter);

// academic branches
const breadth = new Node(
	" The broad offerings of a general, liberal-arts education \u2014 a chance to explore, to connect the disciplines, and to find \
		the many things that one truly enjoys \u2014 are a true gift.\n\nThe liberal arts education is often overlooked in the United \
		States: liberal arts colleges are not as well-known as their big research peers, and many students don't even consider a \
		liberal arts education at the end of their high school years. This is a shame \u2014 liberal arts colleges provide some of the \
		best educations around, and their pedagogical philosophy is one that stands steadfast in the face of changing economic and cultural \
		wants. In the United States, the onset of World War II is oftentimes blamed for the decline in liberal arts colleges' prominence \u2014 \
		technical training was seen as vital to the economy, and liberal ideals took a backseat to them \u2014 but this doesn't mean that liberal \
		education won't ever see a resurgence. In the future, it's possible we may see these hidden gems rise in prominence \u2014 their philosophy \
		of producing well-rounded students armed with knowledge of how to learn, rather than the knowledge of what they learned, seems just as \
		oriented towards our current uncertain future as it was towards the Enlightenment.",
	"breadth.",
	"\u{1F30E}", // globe emoji
	false); // no new paragraph initially
const liberalArts = new Result(
	"You love the small-school vibe, the close relationships with professors, and the genuine learning that takes place at a liberal \
		arts college. You want to explore the disciplines and challenge yourself. You don't really see a need for national notoriety, be it \
		in sports tournaments or national rankings, and you're open to studying anything. Will you end up on the East Coast in the NESCAC? \
		Or on the West Coast in the Claremont Consortium? The Midwest? The Pacific Northwest? Your choice of location \u2014 like your choice \
		of major or career \u2014 is near boundless.",
	"The Liberal Arts College",
	"You've matched with your college(s)! Click to discover your dream school...",
	"\u{1F4DA}",
	"nescac.jpg"
);
breadth.descendants.push(liberalArts);
const depth = new Node(
	"In college, students get a chance to genuinely specialize, often for the first time in their lives. This is the most appealing thing a \
		university can offer: a deep dive into the esoteric specificities of a very complex field of knowledge. For example, students may find themselves ",
	"depth.",
	"\u{1F4AD}", // thought bubble emoji
	false);
academic.descendants.push(breadth, depth);

// stem vs humanities 
const depthSTEM = new Node(
	" For all the complicated math and science it might prerequire, STEM is having its moment. The number of students graduating with degrees \
		in STEM fields is drastically rising, with students motivated by improved career prospects, the growth of innovative new industries, and \
		the benefits of better understanding the world around them. In California, between 2011 and 2017, the total number of STEM bachelor's degrees \
		awarded increased by 55%, tripling the rate of growth in non-STEM fields. Schools and governments have responded by pouring money into STEM \
		programs, accommodating increased interest and enrollment, and applications to top STEM programs have become increasingly competitive. ",
	"pipetting, programming, and analyzing complex data in the corner of a lab.",
	"\u{1F9EC}", // DNA helix emoji
);
const depthHumanities = new Node(
	"That student in the warmly-lit library should probably hope that it's not a departmental library, because it'd probably be slated for demolition \
		if it only housed books in history and English. That valuable campus real estate could be used for a lab, lecture hall, or other sports stadium \
		\u2014 anything that creates value for the university, so anything but the humanities. In seriousness, the decline of the humanities cannot be overstated: \
		humanities enrollment is collapsing, departments are losing funding, and students who choose to study the humanities are ridiculed. These developments \
		are ",
	"digging into a piece of literature or history in a warmly-lit library or lively discussion.",
	"\u{1F3DB}", // classical building emoji
);
const huhEnding = new Node(
	"If there's no demand for humanities programs, schools should focus on meeting our society's needs and advancing the frontiers of knowledge.",
	"justified.",
	"\u{1F911}", // money mouth emoji
	false);
const endOfHumanities = new Node(
	"The gutting of humanities programs is a shortsighted mistake that we as a society will come to regret. Humanities are critical to helping us \
		understand who we are, what we come from, and how we can create a better world, and STEM without humanities is lifeless, empty, and possibly \
		dangerous \u2014 with new developments in powerful technology turning corners daily, a shortage of thought on ethics is not something to be desired. \
		Beyond that, the humanities degree is useful to students who study it: humanities graduates learn communication, critical thinking, creativity, \
		and problem solving in ways that science- and math-oriented students may not. When looking at the sources of the humanities' decline, some are \
		more obvious than others: specifically, the humanities teach people how to think. There are plenty of people in powerful positions who don't \
		see importance in teaching criticism, debate, and abstract thought. Simply, the humanities need to survive if we are going to survive.",
	"a travesty.",
	"\u{1F3AD}"); // performing arts emoji
depthHumanities.descendants.push(huhEnding, endOfHumanities);
depth.descendants.push(depthSTEM, depthHumanities);
const humanitiesResult = new Result(
	"You're into literature, history, language, the arts \u2014 something \"fuzzy\" is really appealing to you, and you want to dive into it in college. Your \
		college essays are probably much more coherent than your peers studying STEM. Your college list might include public universities, liberal arts \
		colleges, private schools, and even schools \"known\" for engineering \u2014 the humanities thrive in many places, even if they don't get credit for it. \
		You're not as worried about getting a job after college \u2014 because that's not what college is primarily for \u2014 but it's something that lingers in \
		the back of your mind.",
	"The Humanities Applicant",
	"You've matched with your college(s)! Click to discover your dream school...",
	"\u{1F56F}", // candle emoji
	"humanities.jpeg");
const businessResult = new Result(
	"You're applying into business, which means you have a specific subset of schools you're interested in. If you get in, you'll have a habit of making \
		it clear that you were admitted into the business school: you go to Wharton, not just Penn; you go to Haas, not just Berkeley; you go to Ross, not just \
		Michigan. If you attend either of the latter two, you might end up labeled a \"haashole\" or \"rosshole,\" but who'll be the one laughing when the checks come in?",
	"The Business Applicant",
	"You've matched with your college(s)! Click to discover your dream school...",
	"\u{1F3E2}", // office building emoji
	"business.jpg");
const nonApplicant = new Result(
	"To you, the purpose of college is to study an esoteric field, particularly the humanities. You also think that the decline of the humanities is justified. \
		Either you misclicked, or you don't think there's a purpose to college at all.",
	"The Nonapplicant",
	"You've matched with your college(s)! Click to discover your dream school...",
	"\u{1F6AB}", // no entry emoji
	"nocollege.png");
huhEnding.descendants.push(nonApplicant);
endOfHumanities.descendants.push(humanitiesResult);

// STEM discussion
const stemScam = new Node(
	"What's most interesting about trends in major selection is that they show that students aren't being motivated by monetary outcomes. The idea \
		that STEM students are somehow rational actors is often used to discredit the decline of the humanities, but brushing past the surface of \
		\"science is the future,\" there's very little evidence justifying these trends. There are plenty of degrees in STEM that don't lead to substantial \
		employment right off the bat: just as students who majored in art history may struggle to find a well-paying job right out of college, the biology \
		bachelor's degree is similarly useless in the job market. Biology students are generally expected to pursue more education, be it a PhD or a medical \
		degree, and without it, their STEM degree accomplishes little. Likewise, psychology is a field that's incredibly popular among American \
		undergraduates today, but its salary statistics are about as dismal as the classics. What's shaping these STEM trends is not necessarily that STEM \
		degrees are actually more valuable, but rather that society has made them out to be more valuable. The people running America's education system \
		are unjustifiably obsessed with STEM, and the narrative that STEM education is the future, meaningful, and well-suited to the job market is pushed \
		to students as young as elementary schoolers. If society were to consider French literature more valuable than pure mathematics, students would pick \
		French literature for the exact same reason STEM majors are rising today. Summarized, this growth of STEM doesn't show that STEM is somehow more \
		valuable than the humanities: rather, it shows that many of the students switching into STEM are unknowingly making a mistake.",
	"The decision to switch into STEM, while encouraged by many, may be predicated on false assumptions.",
	"\u{1F4C9}"); // chart turning down emoji
const yayStem = new Node(
	"STEM fields, traditionally male-dominated, are beginning to see new diversity \
		that promises a more inclusive future in the sciences. Much of this is coming from changes in elementary education \u2014 there's a newfound focus on promoting \
		these subjects to all students, which is probably economically motivated, but it's unlocking something fundamental to how education should work. Children \
		are born scientists \u2014 there is no child that doesn't want to know the way the world works \u2014 and we can only hope that as more focus is placed on improving \
		the quality and accessibility of STEM education, more students will set their minds on finding the answers to society's biggest questions.",
	"These developments are welcome.",
	"\u{1F97C}"); // lab coat emoji
const stemApplicant = new Result(
	"You think of yourself as having found a nice middle ground. You aren't obsessed with money like your computer science and business-oriented peers, and you aren't \
		ignorant to the economic conditions humanities graduates face after college. Likewise, you're open to a wide variety of futures \u2014 medical school, research, \
		technology, engineering, they all sound intriguing. Your dream school is probably well-known for STEM \u2014 be it a private school with strong STEM programs, \
		like MIT or Caltech, or a public school with engineering prowess, like Cal or Michigan \u2014 and you're also applying to lots of smaller polytechnic institutes \
		and engineering colleges. You can't wait for college to get your hands doing things in the lab, classroom, or workshop.",
	"The STEM Applicant",
	"You've matched with your college(s)! Click to discover your dream school...",
	"\u{1F50B}",
	"engineering.png");
yayStem.descendants.push(stemApplicant);
stemScam.descendants.push(humanitiesResult);
depthSTEM.descendants.push(stemScam, yayStem);


// degree value branches
const majorFocus = new Node(
	"Consider the marked decline of the humanities: perceiving poor career opportunities with humanities \
		degrees, students have overwhelmingly flocked to STEM fields, even if these fields do not interest them \
		in the slightest. ",
	"An obvious example of this is trends in major selection over time.",
	"\u{1F4D6}", // open book emoji
	false); // no new paragraph
const prestigeFocus = new Node(
	"College-obsessed high schoolers drool over \"HYPSM\" (Harvard, Princeton, Yale, Stanford, and MIT, for the \
		uninitiated) on internet cesspits, and Reddit threads on higher education-oriented communities feature \
		deeply intellectual debates about the relative merit of a degree from Cornell (an Ivy League school, some \
		users insist) when compared to Duke (whose defenders inevitably point to its \"T10\" ranking).  Under Marx's \
		framework, rankings are another uniform comparative standard which can determine the better of any two schools, \
		but college rankings have arguably transcended this comparative role: they are now the arbiters of quality in the college \
		market, with no \"invisible hand\" to right any wrong decision. Rankings have become something of an obsession \u2014 \
		students base college lists around them, parents consult them frequently,  and even universities themselves have \
		begun to understand that improving their ranking is key to improving their school. ",
	"The numerical ranking of a university, often bundled with other factors to form \"prestige,\" plays a huge \
		role in the exchange value of a degree.",
	"\u{1F3C6}"); // trophy emoji
degreeValue.descendants.push(majorFocus, prestigeFocus)

// major choice branches
const generalSTEM = new Node(
	"For all the complicated math and science it might prerequire, STEM is having its moment. The number of students graduating with degrees \
		in STEM fields is drastically rising, with students motivated by improved career prospects, the growth of innovative new industries, and \
		the benefits of better understanding the world around them. In California, between 2011 and 2017, the total number of STEM bachelor's degrees \
		awarded increased by 55%, tripling the rate of growth in non-STEM fields. Schools and governments have responded by pouring money into STEM \
		programs, accommodating increased interest and enrollment, and applications to top STEM programs have become increasingly competitive. ",
	"To major in STEM is to make the \"right\" choice about college \u2014 to approach education reasonably, \
		study something real, and do something with yourself.",
	"\u{1F9EA}"); // scientific tube emoji
generalSTEM.descendants.push(stemScam, yayStem);
const computerScience = new Node(
	"Computer science can't stop growing: since 1995, the amount of bachelor's degrees awarded in computer science and computer engineering has \
		increased roughly fivefold. Highly-ranked computer science programs have become incredibly selective: general acceptance rates have lowered \
		significantly over the past years, but computer science acceptance rates have fallen even faster. Examples include UC Berkeley, where 2.9% \
		of applicants are admitted to the undergraduate computer science major (compared to 11.4% of applicants overall), the University of Illinois \
		at Urbana-Champaign (6.7% vs. 44.8%), and Carnegie Mellon University (5.2% vs. 19%). For proof that students prioritize exchange value over \
		use value, especially in terms of prestige, computer science programs are the best example. UC Berkeley has one of the best computer science \
		programs in the nation, largely thanks to its high ranking and soaring graduate salaries, but the actual program is in complete shambles: \
		ruined by budget cuts and devastating overenrollment, Berkeley CS is physically incapable of providing students small class sizes, close \
		connections with faculty, and office hours queues that aren't multiple hours long. (Some struggle to even find seats at their lectures.) \
		Despite this, students apply to and enroll at Berkeley in mind-bogglingly massive quantities, the exchange value of the degree being the \
		principal motivating factor. Students gladly pass up enrollment at lesser-known but better resourced schools for a chance at putting \
		Berkeley on their resumes.\n\nMost students enrolling in computer science don't care about computer science. The most common complaint \
		about computer science programs is that they aren't career-oriented enough \u2014 to many, the purpose of a computer science program is to \
		be a stepping stone to a high-paying job at \"FAANG\" (Facebook, Apple, Amazon, Netflix, Google, for the blissfully unaware). Learning about \
		compilers? The math behind computer science? Operating systems? These topics at the core of computer science education are dismissed and \
		disregarded by students because they aren't necessary to cracking the Big Tech interview. Of all fields, it must be computer science where \
		students love learning the least and chase capital the most. ",
	"This trend is perhaps most drastic in the field of computer science, whose enrollment has exploded more \
		dramatically than any other field's in the past decade.",
	"\u{1F5A5}"); // desktop computer emoji
const csResult = new Result(
	"You're applying into computer science for the cold hard cash. Your dream school is one of Stanford, MIT, Carnegie Mellon, or Berkeley, and if \
		those don't work out, you have an array of applications targeted at other schools in the \"T20\" at your disposal. Computer science applicants, \
		owing to the competitiveness of their major, are typically stacked with impressive international awards and massive commitments to extracurricular \
		activities, but that doesn't always work out. Will you be one of the lucky ones?",
	"The Computer Science Applicant",
	"You've matched with your college(s)! Click to discover your dream school...",
	"\u{1F4BB}", // laptop emoji
	"cs.jpg");
computerScience.descendants.push(csResult);
const financeCareers = new Node(
	"",
	"Outside of STEM, economics and business-related degrees have also grown, demonstrating the often pre-professional \
		role college majors have come to play in our perception of education. ",
	"\u{1F3E6}");
const ib = new Node(
	"The role that \"target schools\" play in Wall Street job hiring highlight a concrete impact of prestige. Dismissing prestige altogether in the college \
	admissions process is something that's very commonplace, and it has a lot of value \u2014 students often get hung up on prestige and fail to see schools that \
	would actually appeal to them \u2014 but in the case of pursuing a prestigious job in finance, undergraduate prestige is important. More than half of new hires \
	at investment banks come from \"target schools,\" which are fifteen or so of the most prestigious universities in the United States, and for applicants from \
	non-target schools, the job searching process is infinitely more challenging. Target schools point out a kind of unholy matrimony between capital interests \
	and higher education \u2014 while top-tier universities wouldn't ever specifically endorse themselves as \"target schools,\" they know that they benefit from their \
	relationship with the banks; the banks in turn see the \"target schools\" as better than their peers and elevate them further. The existence of target schools \
	effectively demonstrates the role higher education plays in perpetuating inequality, and the question then becomes one of correlation and causation: who \
	set the ball in motion first?",
	"For some, college is a step towards Wall Street \u2014 the best degrees set a student up best for work at a prestigious investment bank or consulting firm.",
	"\u{1F4C8}", // increasing trend chart emoji
	false); 
const ibResult = new Result(
	"You want to work in a field that pulls in the big bucks, and you aren't ashamed of it either. Your favorite movie is probably The Wolf of Wall Street. \
		Your mindset on prestige and life is probably similar to the attached image, and I don't necessarily mean that in a positive way. \
		Investment banking and consulting are a grind \u2014 you'll need to be armed with great people skills, personality test results, and connections \u2014 but if you make \
		it through, you'll have the joy of completing 80-hour workweeks for the same salary as a lazy tech bro. Good luck on your quest!",
	"The Future Banker/Consultant",
	"You've matched with your college(s)! Click to discover your dream school...",
	"\u{1F4B5}", // dollar emoji
	"ib.png");
ib.descendants.push(ibResult);
const business = new Node(
	"The most popular major in the United States is business, which may come as a surprise to some: business is not an academic field. The major \
		serves as a catch-all for students who don't know what they want to do next but don't want to study any particular subject; it appeals \
		greatly to students who \"have\" to go to college. It's also practical \u2014 getting a degree in business feels like the economically responsible \
		thing to do, regardless of whether or not it is. The reasons a business degree might appeal to students are pretty clear, but the reasons why \
		a university would offer such a degree \u2014 a degree for something which is not an academic discipline \u2014 are less clear. ",
	"For many students, education in the form of a \"business major\" is nothing but pre-professional.",
	"\u{1F4BC}", // briefcase emoji
	false);
financeCareers.descendants.push(ib, business);
majorFocus.descendants.push(generalSTEM, computerScience, financeCareers)

// business branches
const businessGood = new Node(
	"To think pragmatically, colleges ought to teach what students want to learn. There's nothing wrong with that being business. Further, \
		while the academic rigor of business programs is brought into question all the time, the program is about as rigorous as plenty of \
		other programs which are unquestionably \"academic.\" (A savvy marketer hoping to avoid the reputation business programs often get could \
		probably call business an \"interdisciplinary program\" and do very well \u2014 traditional accounting involves math and policy; business \
		requires economics; marketing covers psychology and arts.) Maybe surprisingly, business research is a thing that researchers do concern \
		themselves with. In our society, we interact with business every day, and if students hope to master it, there's no issue in colleges \
		creating a space for that learning. The \"commodification\" of college education isn't necessarily a bad thing \u2014 it gets people to learn \
		the things that need to know to be successful and create value in our society. ",
	"The unfairly derided business major would teach us that where there's demand, there's supply.",
	"\u{1F6CD}"); // shopping bags emoji
const businessBad = new Node(
	"The pre-professional mindset that many students approach college with is indicative of commodity fetishism \u2014 students view certain degrees \
		as pathways to certain jobs with certain salaries (and some degrees as options with little return on investment). Such a mindset is \
		problematic for genuine education, but among individual students, variations in mindset are less damaging to the mission of an academic \
		institution. The choice of academic institutions to offer business programs demonstrates the extent to which these universities have allowed \
		this commodity fetishism to shape their very being. If universities do not consider themselves first and foremost institutions dedicated to \
		research and teaching, they position themselves in such a way where education itself \u2014 knowledge itself, even \u2014 can only hold value in \
		the context of capital.",
	"The business degree shows that colleges in the United States preoccupy themselves with many more roles than that of being an academic institution.",
	"\u{1F644}"); // rolling eyes emoji
business.descendants.push(businessGood, businessBad);
businessGood.descendants.push(businessResult);
businessBad.descendants.push(liberalArts);
// prestige oriented focus branches
const rankingsGood = new Node(
	"The case for rankings is not made very often, but it's one that should be made. If college educations are going to \
		function as commodities (which they'd do even if every college ranking was expunged from our planet), students, \
		like buyers, should have resources that enable them to make informed decisions. Indeed, many of the metrics that \
		college rankings prioritize \u2014 graduation rate, social mobility, available funding per student and faculty member, \
		graduate indebtedness \u2014 are very meaningful to any student determining where they want to get their education. ",
	"Flaws acknowledged, these rankings play an important role in the college ecosystem.",
	"\u{1F9ED}"); // compass emoji
const rankingsBad = new Node(
	"To understand this, we need to understand what a university improving its rank actually looks like. On the surface, \
		it seems like it'd mean bettering financial aid offerings, improving access to programs, growing an endowment, or \
		raising rates of graduation and career placement, but the reality is far more sinister. Rather than invest in improving \
		themselves, schools are incentivized to misrepresent statistics and implement regressive admissions policies that'll \
		move them a few spots up the list. Take Columbia: the university was recently implicated for flat-out lying to US News, \
		the primary arbiter of college rankings in the United States, about numbers from class sizes to graduation rates to the \
		percentage of faculty with terminal degrees. (1. Columbia claimed that 100% of its faculty had terminal degrees, a fact \
		obviously refuted by the school's website. This highlights the absurdity of rankings when one considers that Orhan Pamuk, \
		2006 Nobel Laureate in Literature, is employed by Columbia without a terminal degree \u2014 US News considers this a \
		detriment to student education! 2. Columbia fell fifteen spots, from a record-high national #2, once the statistics were \
		corrected.) Northeastern University, on the other hand, has had a meteoric rise in the national rankings thanks to a \
		ranking-oriented (rather than student-oriented) admissions policy. This move has been both aggressive and transparent: \
		Northeastern boasts about its low acceptance rates and improving rankings, but this is buoyed by an admissions policy that \
		dramatically emphasizes contractually-bound ED applicants and pushes an essay-free application to students across the country \
		for the sole purpose of artificially depressing admission rates. For a chance at Northeastern, students only need to be from \
		high-income households with an ED contract in hand \u2014 their educational aspirations and qualifications are more or less moot. \
		When education becomes a commodity, both students buying and universities selling are pushed to profit-maximize, inevitably \
		at the expense of access and outcomes. \n\nCapital, per Marx, has alienated everyone from education. The rankings-centered \
		culture surrounding college admissions has tainted even the process of identifying an institution where a student believes \
		they would thrive because success past college is equated to deriving value from college. Universities do everything in their \
		power to move up the rankings ladder, even if it comes at the expense of their students. Education is rendered a second \
		priority of an institution centered on prestige and profit. ",
	"The ubiquity of rankings will ultimately be the downfall of American higher education.",
	"\u{1F5D1}"); // wastebasket emoji
const publicSchoolResult = new Result(
	"Attending one's in-state public university is a route that some look down upon, but you know you're making the rational decision. \
		Pummeled by rankings for their crime of educating as many students as possible, public universities are centers for social \
		mobility and affordable, world-class educations. By staying in-state, you'll avoid much of the debt that prviate university matriculants \
		often need to take on the finance their educations. Bravo!",
	"The Public In-State",
	"You've matched with your college(s)! Click to discover your dream school...",
	"\u{1F6E3}", // freeway emoji
	"uccsu.jpg");
rankingsBad.descendants.push(publicSchoolResult);
prestigeFocus.descendants.push(rankingsGood, rankingsBad);

// rankings are good branches
const shotgun = new Node(
	"Getting into a \"top\" school is difficult, but once that ticket is punched, students are faced with untold \
		opportunity and social mobility. Sure, Princeton has its ancient Ivy prestige, but it also has generous financial \
		aid and students who graduate with much less debt than many other schools. Beyond that, while we hate to \
		acknowledge it, prestige matters in our society. When a student is stuck in a college admissions process defined \
		by insanity, their only choice is to play the game. Rolling the dice as many times as possible is the smartest \
		way to go about it.",
	"Who's to say that students shouldn't pursue the very best?",
	"\u{1F3B0}"); // slots emoji
const shotgunResult = new Result(
	"A shotgunner \u2014 or more derisively, a \"prestige whore\" \u2014 is unfazed by the prospect of writing \
		hundreds of supplemental essays over their senior winter break. Shotgunners set their hearts on prestige, \
		and they'll apply anywhere \u2014 sorry, anywhere prestigious \u2014 to maximize their shot \
		at just one acceptance in the US News Top 20. Don't hate the player; hate the game.",
	"The Shotgunner",
	"You've matched with your college(s)! Click to discover your dream school...",
	"\u{1F3B2}", // dice emoji
	"shotgun.png");
shotgun.descendants.push(shotgunResult)
const findYourPick = new Node(
	"If you dig in and examine the rankings, you'll notice that there's an absurdity to them. Ranking Texas A&M \
		University, a school of 56,723 undergraduates, alongside Yeshiva University, a school of 2,553 undergraduates, \
		doesn't make sense. These results come up because the rankings are nothing more than a formula weighing different \
		aspects of a college. Once it's understood that the rankings aren't categorically picking a top college, but rather \
		amalgamating dozens of different data points, the game changes \u2014 it's not about maximizing prestige; it's about \
		determining what factors matter to you. In a world where a skyrocketing price of college puts students into \
		unimaginable debt, in a world where college degrees may not be surefire shots at career placement, in a world where \
		for-profit colleges (an entire beast I will not get to, may I add) prey on vulnerable students and fail to get them \
		to graduation, rankings help students find an education that will bring something meaningful to them.",
	"Ultimately, beyond the circus that is the top ten and the loud minority of (nasty) people who cling to the \
		rankings to justify an internal sense of self-superiority, the rankings are simply a tool.",
	"\u{1FAB4}"); // plant in pot emoji
const yourPickResult = new Result(
	"College is about your education, and you're going to find what matters to you. Programs? Locations? Culture? \
		The things that matter to you matter; the things that don't matter don't. You aren't easily influenced by \
		prestige; there are thousands more colleges outside of the 'top ten' to choose from. By doing your research \
		and doing what's right for you, you'll escape (most of) the insanity of the college process. In the American \
		college application culture sense, you'll end up \"right where you belong.\"",
	"The Free Spirit",
	"You've matched with your college(s)! Click to discover your dream school...",
	"\u{1F9E9}", // puzzle emoji
	"match.png");
findYourPick.descendants.push(yourPickResult);
rankingsGood.descendants.push(shotgun, findYourPick);
// ------ scripting to run in js file ------
// init(); // now executed in HTML file