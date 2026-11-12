/**
 * Official Client Verbiage — Live Achieve Believe (LAB)
 * Single source of truth directly from client documents.
 */

export interface PillarContent {
  id: string;
  doorNumber: number;
  title: string;
  lead: string;
  quote?: string;
  intro: string;
  whatWeDo: string;
  howYouCanHelp: string;
  tagline: string;
  ctas: Array<{
    label: string;
    href: string;
    primary?: boolean;
  }>;
}

export const howWeServeManifesto = {
  title: "HOW WE SERVE",
  quote: "Love is more than something we believe. It is something we choose to do. Every day.",
  lead: "Every act of service begins with the same belief: every person deserves to be seen, valued, and given the opportunity to thrive.",
  body: "Whether we're sharing a meal, helping someone turn a house into a home, investing in young people, creating conversations through the arts, or standing beside a veteran, our purpose never changes. Only the way we serve does.",
};

export const officialPillars: Record<string, PillarContent> = {
  placeAtTheTable: {
    id: "a-place-at-the-table",
    doorNumber: 1,
    title: "A Place at the Table",
    lead: "Sometimes hope begins with a meal.",
    intro: "A meal is never just food. It is an invitation to belong, to be heard, and to be reminded that every person has value.",
    whatWeDo: "LAB provides meals and compassionate outreach to individuals experiencing homelessness, veterans, and families facing difficult circumstances. Through community partnerships and direct street outreach, we share nourishment, encouragement, and moments of genuine human connection. Our efforts include serving alongside Bread of Refuge and Family Promise of Hillsborough County, as well as bringing meals directly to people in need.",
    howYouCanHelp: "Help prepare or serve meals, donate food and supplies, sponsor a meal outreach, or connect us with community partners who share our commitment to serving others.",
    tagline: "There Is Always Another Seat Waiting.",
    ctas: [
      { label: "Volunteer", href: "/movement?tab=volunteer", primary: true },
      { label: "Donate Food & Supplies", href: "/donate?category=supplies" },
      { label: "Sponsor a Meal", href: "/donate?category=meals" },
    ],
  },

  strongFoundations: {
    id: "strong-foundations",
    doorNumber: 2,
    title: "Strong Foundations",
    lead: "Sometimes hope begins with guidance.",
    intro: "Every young person deserves to know their worth, discover their strengths, and recognize the possibilities ahead.",
    whatWeDo: "Through our LEADS Youth Development partnership with Life Skills, Empowerment and Development Services, LAB helps young people build the skills that support healthy relationships and stronger futures. The program emphasizes communication, respect, confidence, resilience, and practical life skills that help youth make thoughtful choices and navigate life’s challenges.",
    howYouCanHelp: "Support youth development activities, share relevant professional skills, provide educational resources and program supplies, or help sponsor opportunities that encourage young people to learn and grow.",
    tagline: "Because believing in a young person today can change how they see tomorrow.",
    ctas: [
      { label: "Volunteer", href: "/movement?tab=volunteer", primary: true },
      { label: "Support Youth Development", href: "/movement?tab=youth" },
      { label: "Become a Program Sponsor", href: "/donate?category=youth-sponsor" },
    ],
  },

  storiesThatSaveLives: {
    id: "stories-that-save-lives",
    doorNumber: 3,
    title: "Stories That Save Lives",
    lead: "Sometimes hope begins with one conversation.",
    intro: "Behind every smile is a story we may not know. Sometimes the most important words are the ones someone hasn't yet found the courage to say.",
    whatWeDo: "Through Suicide Awareness Showdown and other creative experiences, LAB uses storytelling, theatre, music, and dance to encourage meaningful conversations about mental health, emotional struggles, human connection, and hope. Our goal is to help people recognize what others may be carrying, reduce the silence surrounding difficult experiences, and encourage people to seek support before reaching a crisis. We also welcome collaboration with mental health professionals and community organizations to help connect audiences with appropriate educational resources and support.",
    howYouCanHelp: "Volunteer your time or talents, participate in productions and events, help with event operations, become a sponsor, contribute professional expertise, or help us connect with mental health organizations and community partners.",
    tagline: "Every Story Matters. Every Life Has Value.",
    ctas: [
      { label: "Volunteer", href: "/movement?tab=volunteer", primary: true },
      { label: "Sponsor an Event", href: "/suicide-awareness-showdown#sponsor" },
      { label: "Partner With Us", href: "/contact?subject=mental-health-partner" },
    ],
  },

  welcomeHome: {
    id: "welcome-home",
    doorNumber: 4,
    title: "Welcome Home",
    lead: "Sometimes hope begins with a key.",
    intro: "Home is more than a roof overhead. It is a place to feel safe, regain stability, and begin imagining what comes next.",
    whatWeDo: "LAB works to create welcoming, furnished housing opportunities for veterans who need stability and a comfortable place to call home. We seek suitable rental properties, furnish homes with essential household items, and establish property-care arrangements that support comfortable living while respecting the responsibilities of property owners. Our vision is to provide more than a place to stay. We want veterans to experience dignity, peace of mind, and a foundation from which to move forward.",
    howYouCanHelp: "Property owners and real estate professionals can help us identify suitable homes. Businesses and individuals can donate furnishings, household necessities, or financial support. Community partners can also help connect veterans with appropriate services and resources.",
    tagline: "Because those who have served deserve a place where they feel valued.",
    ctas: [
      { label: "Explore a Housing Partnership", href: "/contact?subject=housing-partnership", primary: true },
      { label: "Donate Furnishings", href: "/donate?category=furnishings" },
      { label: "Support Veteran Housing", href: "/donate?category=veterans" },
    ],
  },

  newBeginning: {
    id: "a-new-beginning",
    doorNumber: 5,
    title: "A New Beginning",
    lead: "Sometimes hope begins with the little things.",
    intro: "A fresh set of linens. A pair of shoes. A table where a family can gather. What seems ordinary to one person can mean a new beginning to another.",
    whatWeDo: "LAB helps individuals and families access practical necessities, including clothing, shoes, household goods, linens, and other everyday essentials. These items can ease financial burdens, help turn an empty space into a welcoming home, and give someone the confidence and comfort to take their next step.",
    howYouCanHelp: "Donate usable clothing, shoes, furniture, linens, and household essentials; organize a collection drive; help sort and prepare donated items; or contribute toward purchasing supplies for specific needs.",
    tagline: "Sometimes a new beginning starts with something beautifully simple.",
    ctas: [
      { label: "Donate Essentials", href: "/donate?category=essentials", primary: true },
      { label: "Organize a Drive", href: "/movement?tab=drive" },
      { label: "Volunteer", href: "/movement?tab=volunteer" },
    ],
  },
};

export const serveBesideUs = {
  title: "Serve Beside Us",
  lead: "Sometimes hope begins with someone who says yes.",
  intro: "You don't need extraordinary resources to make an extraordinary difference. Sometimes all it takes is a willing heart and the decision to show up.",
  whatWeDo: "LAB brings volunteers together to support community meals, outreach activities, youth initiatives, housing preparation, donation organization, special events, and other opportunities to serve. We seek to match people’s talents, interests, and availability with meaningful ways to contribute.",
  howYouCanHelp: "Join us as an individual volunteer, bring your family or a group, organize a workplace service activity, or share a professional skill that can strengthen our work. Whether you have a few hours or an ongoing commitment to offer, we welcome the opportunity to explore how you can serve alongside us.",
  tagline: "We don't believe everyone has to do everything. We believe everyone can do something.",
  ctas: [
    { label: "Become a Volunteer", href: "/movement?tab=volunteer", primary: true },
    { label: "Bring a Group", href: "/movement?tab=group" },
    { label: "Share Your Talents", href: "/movement?tab=talents" },
  ],
};

export const yourStory = {
  title: "Your Story",
  lead: "Every story has the power to change another.",
  intro: "You've walked through our story. Now there is room for yours.",
  whatWeDo: "LAB brings individuals, businesses, faith communities, organizations, and community leaders together around a shared belief that people matter. Through partnerships, sponsorships, charitable giving, and community involvement, we work to expand the reach of our programs and create more opportunities for people to experience compassion in action.",
  howYouCanHelp: "Become a community partner, sponsor an initiative, make a charitable contribution, introduce us to others who share our mission, or help spread the word about the work being done. Every contribution matters, whether it is time, talent, resources, relationships, or encouragement.",
  tagline: "Your story doesn't have to look like ours to become part of something meaningful.",
  ctas: [
    { label: "Become a Partner", href: "/movement?tab=partner", primary: true },
    { label: "Sponsor an Initiative", href: "/donate?category=initiative-sponsor" },
    { label: "Give Hope", href: "/donate" },
  ],
};

export const oneMissionManyExpressions = {
  title: "One Mission. Many Expressions.",
  lead: "Every door opens because someone matters.",
  body: "At Live Achieve Believe, we don't measure the value of our work only by what we provide. We care about how people experience that help, whether they feel respected, supported, connected, and encouraged to move forward.",
  mantra: [
    "Think Higher.",
    "Feel Deeper.",
    "Act with Purpose.",
  ],
  closing: "There is a place for you here.",
  ctas: [
    { label: "Explore Our Programs", href: "/how-we-serve", primary: true },
    { label: "Volunteer", href: "/movement?tab=volunteer" },
    { label: "Support Our Mission", href: "/donate" },
  ],
};

export interface OfficialLeaderProfile {
  id: string;
  indexLabel: string;
  monogram: string;
  name: string;
  role: string;
  organization: string;
  headline: string;
  bioParagraphs: string[];
  quoteLines: string[];
  quoteAttribution: string;
}

export const meetUsLeadership = {
  eyebrow: "MEET US",
  heading: "The people behind Live Achieve Believe, Inc.",
  subheadline: "Different experiences. Different strengths. One shared belief: People Matter.",
  leaders: [
    {
      id: "celeste-hudson",
      indexLabel: "01",
      monogram: "CH",
      name: "Celeste Hudson",
      role: "Founder",
      organization: "Live Achieve Believe, Inc.",
      headline: "A Heart for People. A Life of Purpose.",
      bioParagraphs: [
        "Celeste Hudson has traveled many roads, from foreign missionary service to Wall Street, where she worked as a broker, to establishing her own commodities brokerage firm and building three business ventures, including Live Achieve Believe, Inc.",
        "Yet her greatest accomplishment cannot be measured by professional success. It is found in her unwavering belief in the value of people.",
        "Celeste’s life has been shaped by faith, resilience, courage, and an enduring willingness to grow. She understands that strength is not born from perfection, but often from the imperfections, challenges, and unexpected turns that teach us humility, deepen our compassion, and strengthen our foundation.",
        "Through LAB, Celeste brings together her entrepreneurial spirit and her heart for humanity, encouraging people to look beyond circumstances, embrace possibilities, and turn compassion into meaningful action. She continues to approach life as a journey of discovery, believing that growth is not simply about how far we travel, but how deeply we come to understand what truly matters.",
      ],
      quoteLines: [
        "We shall not cease from exploration",
        "And the end of all our exploring",
        "Will be to arrive where we started",
        "And know the place for the first time.",
      ],
      quoteAttribution: "— T. S. Eliot, Little Gidding",
    },
    {
      id: "aniah-danielle",
      indexLabel: "02",
      monogram: "AD",
      name: "Aniah Danielle",
      role: "Chief Operating Officer",
      organization: "Live Achieve Believe, Inc.",
      headline: "A Heart for Healing. A Passion for Empowerment.",
      bioParagraphs: [
        "Aniah Danielle believes that true success begins with a healthy mind, a strong foundation, and the confidence to embrace life’s possibilities.",
        "Her passion for mental-health advocacy grew from a deeply personal experience: the loss of a close friend to suicide during her senior year of high school. That experience strengthened her commitment to helping others navigate challenges with compassion, resilience, and hope.",
        "Currently pursuing a degree in Clinical Psychology, Aniah brings both curiosity and purpose to her work. As an educator of young children and a facilitator with the LEADS youth-development program, she is dedicated to creating environments where children feel safe, valued, encouraged, and empowered to grow.",
        "Her experiences advocating for children and families navigating complex legal and mental-health systems have deepened her understanding of patience, empathy, and meaningful support. As a wife, educator, student, and nonprofit leader, she strives to encourage others to discover their strengths and pursue their goals with emotional wellness, resilience, and confidence.",
      ],
      quoteLines: [
        "My mission in life is not merely to survive but to thrive; and to do so with some passion, compassion, some humor and some style.",
      ],
      quoteAttribution: "— Maya Angelou",
    },
    {
      id: "uzziah-townsley",
      indexLabel: "03",
      monogram: "UT",
      name: "Uzziah Townsley",
      role: "Director of Operations",
      organization: "Live Achieve Believe, Inc.",
      headline: "Building Possibilities. Creating Pathways.",
      bioParagraphs: [
        "Uzziah Townsley believes that building a better future requires more than vision. It takes determination, practical experience, and a genuine desire to make a difference in the lives of others.",
        "With aspirations of pursuing a degree in Mechanical Engineering at the University of South Florida, Uzziah is actively preparing for the next chapter of his educational journey. Through apprenticeships with construction companies, he has gained hands-on exposure to different aspects of engineering, strengthening his technical interests and appreciation for how things work.",
        "As Director of Operations for Live Achieve Believe, Inc., Uzziah has supported fundraising initiatives, prepared and served meals to people experiencing homelessness, and contributed to the organization’s creative work. During LAB’s first Suicide Awareness Showdown, he ran stage operations while working directly with the stage manager.",
        "He approaches challenges with curiosity, determination, and a willingness to learn by doing. For Uzziah, engineering and humanitarian service are complementary expressions of the same purpose: creating solutions that improve lives and making sure those solutions serve the people who need them.",
      ],
      quoteLines: [
        "The mechanical engineer builds the bridge, the humanitarian ensures that everyone can safely cross it, my job is to do both.",
      ],
      quoteAttribution: "— Uzziah Townsley",
    },
  ] satisfies OfficialLeaderProfile[],
};

