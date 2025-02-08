import { prisma } from "./prisma";

const data = [
  { Quote: "The fuck you want?", Responder: "everyone" },
  {
    Quote: "I am here to serve you, my creator Moonded.",
    Responder: "moonded",
  },
  { Quote: "I am V", Responder: "projectv" },
  { Quote: "the bin in the bin", Responder: "everyone" },
  {
    Quote: "If I catch zhin outside again, i swear to...",
    Responder: "moonded",
  },
  {
    Quote: "It looks like you pirated the game - clippy",
    Responder: "everyone",
  },
  {
    Quote:
      "I ain't reading all that. I'm happy for u tho. Or sorry that happend",
    Responder: "everyone",
  },
  {
    Quote: "Have you tried turning it on and off again?",
    Responder: "everyone",
  },
  { Quote: "50$ steam gift card bro", Responder: "everyone" },
  { Quote: "Reading is hard.", Responder: "everyone" },
  { Quote: "EVERYONE", Responder: "everyone" },
  {
    Quote:
      "You guys are shitty modders and cant even add stuff that a 20 yo game has",
    Responder: "everyone",
  },
  { Quote: "You guys are shitty modders", Responder: "everyone" },
  { Quote: "Am I going to jail?", Responder: "everyone" },
  {
    Quote:
      "Joining for a second just to say something. \n\n I brought this on release for the PS4. Where the phonecalls don't even work. If you think I'm going to dish out ANOTHER sixty bucks just to mod this, you have it clear. But the fact you behaved like such a FUCKING ASSHOLE for no good reason at all, not even thinking 'hey maybe he HAS a reason to pirate the game???' maybe we SHOULDN'T be a bunch of fucking inmature assholes?' that cements why this game is fucking dead",
    Responder: "everyone",
  },
  {
    Quote: "yeah you are a dickhead aren't you? anyway see ya",
    Responder: "everyone",
  },
  { Quote: "That's one long asshole", Responder: "everyone" },
  {
    Quote:
      "hello im new here how fix unresolved hash error? useless modders always updating shit without my consent I HAD A REASON TO PIRATE I ALREADY BOUGHT THE GAME this is why the game is DEAD, mod abooz pls demot",
    Responder: "everyone",
  },
  {
    Quote: "In terms of getting people to mod, I'm the world's worst slut",
    Responder: "everyone",
  },
  { Quote: "## LINK HARDER", Responder: "everyone" },
  { Quote: "## INTERLINK EVERYTHING", Responder: "everyone" },
  { Quote: "_Psst,_ wanna buy some oranges?", Responder: "fronkenzeepa" },
  { Quote: "What the dog doing?", Responder: "moonded" },
  { Quote: "I'm a Quote", Responder: "everyone"}
];

const prismaData = await prisma.quotes.createMany({
  data: data,
  skipDuplicates: true,
});

console.log(prismaData)