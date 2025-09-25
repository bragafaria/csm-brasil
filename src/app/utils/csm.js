export const reportTemplates = {
  "N-V-I-S-H": {
    essence: {
      mild: [
        "You have a real knack for spotting what people could become and helping them get there, but in a way that feels natural and flexible rather than pushy. With your mild preference for big-picture thinking, you can easily switch between dreaming up exciting possibilities and focusing on the practical details that make them happen. This balance lets you guide others without getting stuck in one mode, making your support feel just right for whatever situation comes up. It's this adaptability that makes you such a great mentor—you meet people where they are and help them move forward at their own pace, building confidence along the way.",
        "Your way of thinking comes from a mix of what feels right for the group and what makes sense on a personal level, giving you a solid but not rigid view of how to encourage others. You picture paths forward that consider everyone's input, adjusting as new ideas come in, which keeps things collaborative and fair. This approach helps you stay kind and consistent, always aiming to make things better without forcing it. Over time, it creates trust because people see you as someone who listens and adapts, turning group discussions into real steps toward shared goals.",
        "What really lights you up in mentoring is noticing someone's hidden strengths and helping them use them to grow, step by step, instead of jumping to quick fixes that don't last. Your mild lean toward steady progress means you build support that develops over time, like adding layers to a foundation so it gets stronger with each addition. This not only keeps you motivated but also gives the people you help a sense of ownership—they see how their efforts add up and lead to real change. It turns mentoring moments into ongoing conversations that stick with them long after.",
        "Deep down, you're all about unlocking potential through kindness, and your flexible style lets you team up with others without losing your own voice. You share insights in a way that feels collaborative, drawing from what you know while learning from them, which makes your guidance feel personal and relevant. This setup positions you as a steady presence people can count on, sparking changes that spread because they feel genuine and shared. It's this blend of care and openness that makes your impact last, helping others see their own path more clearly.",
        "Your overall approach mixes hopeful ideas about the future with a focus on working well with others, turning solo thoughts into group efforts that everyone benefits from. You offer encouragement that lifts people up while keeping things connected, evolving from one-on-one talks to bigger team successes. This makes you a leader who's reliable in the moment but thinks long-term, lighting the way for not just one person but whole groups. In the end, it's this combination that leaves a lasting mark, as people remember how you helped them grow together.",
      ],
      moderate: [
        "You're great at seeing people's true potential and guiding them toward it with a steady, reliable touch that feels supportive without being overwhelming. Your moderate focus on big ideas means you can hold onto those visions while grounding them in real-world steps, helping others see how to make changes that stick. This reliable style lets you build progress that feels solid, turning inspiration into action that lasts. It's why people turn to you—you make growth feel achievable and exciting, step by steady step.",
        "Your thinking style draws from a clear sense of what's possible for groups and individuals, giving you a consistent way to encourage without getting sidetracked. You map out paths that balance everyone's needs, sticking to the main ideas but open to tweaks, which keeps things moving forward smoothly. This consistency makes you kind and effective, always pushing for better outcomes in a way that feels fair. It builds real trust, as people know your advice comes from a place of steady care and shared success.",
        "The best part of mentoring for you is spotting key strengths and helping turn them into lasting growth, rather than band-aid solutions that fade fast. With your moderate emphasis on building over time, you create plans that layer on each other, making sure each step reinforces the last for real results. This keeps you engaged and shows the people you help how their efforts add up to something big. It makes those guidance moments feel like part of a bigger story they're writing themselves.",
        "At your core, you're driven by a strong belief in potential and kindness, handled with a reliable approach that mixes your wisdom with group input. You share guidance that feels true to you but also fits the situation, adjusting based on what you learn along the way. This makes you a go-to person for inspiration that sticks, starting small changes that grow into bigger ones. Your impact comes from this blend of heart and steadiness, helping others find their way with confidence.",
        "You base your guidance on solid hopes for what's ahead, combined with a focus on team effort, turning personal ideas into shared wins that everyone owns. You give support that motivates while keeping connections strong, building from simple talks to full group achievements. This positions you as a leader who's dependable now and visionary for later, guiding not just one but many toward better futures. It's this mix that creates real, ongoing change in the lives around you.",
      ],
      strong: [
        'You have an incredible talent for seeing deep potential in people and pushing them toward it with a strong, focused energy that really makes things happen. Your strong pull toward big ideas lets you dive into those visions fully, often putting the "what if" ahead of the "what is," which drives major breakthroughs. This intense style makes your mentoring powerful, sparking changes that go deep and last. People feel the difference because you help them break through limits they didn\'t even know were there.',
        "Your mindset is built on a deep belief in what's possible and right, giving you a bold way to motivate others that feels urgent and important. You hold onto those visions tightly, using them to shape group and personal growth with little room for side tracks, which keeps the focus sharp. This strength makes you consistently caring and driven, always aiming high in a way that pulls everyone up. It creates momentum that turns ideas into real movement, with people following because they sense the conviction behind it.",
        "What gets you excited about mentoring is digging out core strengths and channeling them into big, lasting development, skipping short-term patches for something transformative. Your strong commitment to this long-view approach means you build support that hits deep, like laying a foundation that supports a whole building over time. This keeps you fired up and gives those you guide a clear sense of how their strengths can lead to major shifts. It turns your sessions into turning points that stick, as they see the full picture of their growth.",
        "You're passionate about turning potential into kindness in action, and your strong style lets you lead with deep insight while tying it to group needs. You deliver guidance that's authentic to you but powerful for everyone, pushing boundaries while staying true to what matters. This makes you a force for inspiration that starts fires of change, spreading because it feels real and urgent. Your strength here is in creating waves of positive impact that go far, helping others unlock parts of themselves they didn't know existed.",
        "Your method is rooted in big, confident hopes for the future, paired with a drive for team unity that turns individual sparks into group fires. You offer support that motivates deeply while building strong connections, growing from focused talks to major collaborative wins. This makes you a leader who's intense in the now but shapes what's next, lighting paths for whole teams. It's this powerful combo that leaves a big mark, as people carry forward the energy you bring to their lives.",
      ],
    },
    dimensionalProfile: {
      uniqueSpectrum:
        "Here are your spots on the five lines, shown as sliders to make clear your natural leans. They give a quick view of how you face life as a Mentor, and how these preferences work together to shape your approach.<br/><br/>" +
        "• {0}: You focus on big ideas and futures but can check real facts if they help.<br/>" +
        "• {1}: You decide mainly on care and feelings, with logic as backup.<br/>" +
        "• {2}: You get energy from inner thoughts, but sometimes reach out for info.<br/>" +
        "• {3}: You like planned ways but can change if needed.<br/>" +
        "• {4}: You prefer team paths, but can work alone for good reasons.",
      dimensions: [
        {
          title: (primaryPct, secPct, domLevel, infLevel) =>
            `Abstract (N) [${primaryPct}% – ${domLevel.toLowerCase()} dominance] vs. Concrete (C) [${secPct}% – ${infLevel.toLowerCase()} influence] on Information Processing`,
          mild: [
            'Your mild lean toward abstract thinking is a key part of what makes you a great Mentor—it lets you see patterns and possibilities without getting too lost in them, while still paying attention to the details that keep things real. You feel comfortable exploring "what if" scenarios, like how someone\'s skills could grow in new ways, but you also check in with facts and current realities to make sure your ideas land well. This balance helps in everyday mentoring, where you can dream big with someone but also break it down into simple next steps. It makes your guidance feel exciting yet doable, and people appreciate how you make the future feel close and achievable.',
            "When you trust your gut on open-ended info, like stories from others or trends you notice, it's because it helps you connect the dots in helpful ways, but you're quick to back it up with what you know is true. For example, if someone's stuck, you start by imagining different paths forward—maybe new opportunities or team roles—but then look at what's actually available right now to keep it practical. This way of working shows up in your mentoring: you spot big clues in what people say or do, and use them to offer advice that feels personal and forward-looking. It's this mix that makes your support stand out—you're not just theorizing; you're helping make it happen.",
            "With this mild abstract side, you're really good at giving support that looks ahead without ignoring the now, turning ideas into plans that people can actually use. You shine in situations like career talks or group problem-solving, where you help spot hidden chances or team fits, and then suggest concrete ways to test them out. Your advice grows as you talk, adjusting to new info, so it always feels fresh and relevant. People leave feeling inspired because you show them not just the dream, but how to start walking toward it, one step at a time.",
            "Your concrete side, with its high influence, is like a helpful reminder to stay grounded—it pulls you back to facts and details when big ideas need some structure to work. Say you're brainstorming a growth plan; if it starts feeling too vague, you think about real resources or past examples to make it solid. This keeps your mentoring balanced, avoiding plans that sound great but fall apart. It's a strength that makes your guidance more trustworthy, as people know you're thinking about what's possible right now, not just someday.",
            'Overall, this mild abstract preference captures what makes you a flexible Mentor—you handle futures with an open mind but keep one foot in the present, making your help both motivating and realistic. You approach life like a guide who knows the map but loves exploring side paths, mixing "could be" with "is" to create real progress. Whether it\'s one person or a team, your style helps them see options clearly and feel ready to try. It\'s this practical optimism that leaves a lasting impression, as people carry forward both the vision and the tools to make it theirs.',
          ],
          moderate: [
            "Your moderate preference for abstract thinking is the steady engine behind your mentoring—it gives you a clear focus on patterns and future options, strong enough to guide but flexible enough to adapt. You get energized by connecting dots, like seeing how someone's experiences could lead to new roles or ideas, but you always tie it back to what's happening now to keep it useful. This reliable balance shows up in how you help others: you paint a picture of what's possible, then outline the steps to get there, making growth feel like a natural next move. It's this consistent forward look that makes your support so effective and easy to follow.",
            "You rely on open info like people's stories or group trends because it helps you build a bigger picture, but you cross-check with solid facts to make sure it holds up. In a mentoring session, if someone's facing a challenge, you map out several ways it could play out—maybe team collaborations or skill upgrades—and then look at real examples or data to pick the best fit. This method makes your advice feel thoughtful and tailored, as you use what you sense to spot opportunities others miss. It turns talks into action plans that people can trust and run with.",
            'This moderate abstract lean makes you excellent at offering guidance that looks ahead while staying connected to the present, helping turn "someday" ideas into "soon" realities. You do well in things like planning career shifts or team strategies, where you highlight potential paths and back them with practical checks. Your input develops as you learn more, so it always fits the moment. People value how you make the unknown feel manageable, showing them the big picture and the first few pieces to start with.',
            "Your concrete influence, at a moderate level, acts as a good check-in, reminding you to focus on details and evidence when visions need more meat on them. For instance, when developing a plan, if it's too high-level, you dig into timelines or resources to make it workable. This keeps your mentoring practical, avoiding fluffy ideas that don't land. It adds credibility, as people see you're not just dreaming—you're planning with what's real.",
            'In the end, your moderate abstract side defines you as a Mentor who guides with clear vision and solid footing, making futures feel reachable. You tackle life like a navigator who charts courses but adjusts for weather, blending "what if" with "what now" for real results. Whether helping one person or a group, your approach builds momentum that lasts. It\'s this grounded hope that makes your impact stick, as people move forward with both direction and confidence.',
          ],
          strong: [
            "Your strong preference for abstract thinking is the powerful core of your mentoring—it drives you to see deep patterns and endless possibilities, often putting the future front and center over today's details. You thrive on exploring how things could connect or change, like imagining bold new directions for someone's career or team, which leads to big breakthroughs. This intense focus makes your guidance transformative, pushing people to think bigger than they would alone. It's this visionary energy that sets you apart, helping others break free from routines and aim high.",
            "You put a lot of trust in open insights from conversations, trends, or gut feelings because they unlock creative solutions, and you're less worried about every little fact unless it's critical. When mentoring, if there's a roadblock, you dive into \"what could happen next\"—like new partnerships or skill leaps—and use examples to show why it works, keeping the energy high. This way, you spot opportunities fast and share them with conviction, making your advice feel urgent and inspiring. It turns sessions into idea explosions that get people excited to act.",
            "With this strong abstract side, you're amazing at giving forward-focused support that challenges people to grow in ways they hadn't considered, turning vague hopes into clear strategies. You excel in high-stakes stuff like leadership development or innovation brainstorming, where you lay out potential futures and rally everyone around them. Your ideas build as you talk, gaining depth and drive. People walk away motivated because you show them not just options, but why they're worth chasing, with the passion to make it real.",
            "Your concrete side, with low influence, only steps in when absolutely needed, like adding hard numbers or timelines to keep a big plan from falling apart. For example, if a vision sounds too out there, you might add quick checks on feasibility, but you prefer staying in the realm of ideas. This keeps your mentoring dynamic, though it means working to include details sometimes. It's a reminder to ground your strengths, making your guidance even more powerful when it connects to reality.",
            'Overall, this strong abstract preference makes you a Mentor who lights up paths to the future with real fire, prioritizing possibility to create lasting change. You approach challenges like an explorer charting new lands, mixing bold "what ifs" with just enough "how" to launch. In one-on-one or teams, your style sparks energy that spreads. It\'s this forward drive that leaves a deep mark, as people chase horizons they once thought impossible, thanks to your clear, compelling vision.',
          ],
        },
        {
          title: (primaryPct, secPct, domLevel, infLevel) =>
            `Values (V) [${primaryPct}% – ${domLevel.toLowerCase()} dominance] vs. Logic (L) [${secPct}% – ${infLevel.toLowerCase()} influence] on Decision-Making`,
          mild: [
            "Your mild preference for values means you make decisions based on what feels right for people and fits your sense of good, but you can easily bring in logic when it helps keep things fair. This balance lets you consider how choices affect feelings and relationships, while still looking at the facts to make sure it all adds up. It shows up in mentoring as advice that's kind but practical, helping people feel supported without ignoring what works. You're good at finding middle ground, making your guidance feel thoughtful and fair to everyone involved.",
            "When you lean on values, it's because you care about the human side—like how a decision impacts someone's confidence or team vibe—but you check with logic to avoid bias. In a tough spot, you weigh emotions and ethics first, then add cause-and-effect thinking to refine it. This makes your mentoring feel empathetic yet smart, as you explain why something's good for the heart and the head. It builds trust because people see you're looking out for them while keeping it real.",
            "This mild values focus makes you strong in roles where you nurture growth, like one-on-one coaching or group harmony talks, where you spot emotional needs and suggest caring steps. You go step by step: see the issue, think about the impact, choose a path that heals, and it pairs well with your big-picture side for well-rounded advice. Your support feels warm and steady, helping people open up and move forward. It's this caring touch that makes your help memorable and effective.",
            "Your logic side, with high influence, is a great partner—it kicks in to add structure when feelings need a framework, like using pros and cons to balance a tough choice. For example, if a decision feels right emotionally but risky, you run through the if-thens to make it safer. This keeps your mentoring balanced, avoiding overly soft spots. It adds strength, as people appreciate the clear thinking behind your kind words.",
            "In short, your mild values preference makes you a Mentor who leads with heart but backs it with smarts, creating guidance that connects on every level. You handle choices like a friend who listens deeply but thinks ahead, mixing care with clarity for real results. Whether alone or in groups, your style helps people feel valued and directed. It's this warm wisdom that sticks, as they carry forward both the feeling and the plan.",
          ],
          moderate: [
            "Your moderate values preference gives you a reliable way to decide based on what's good for people and aligns with your principles, strong enough to guide but open to logic for balance. You focus on how things affect emotions and harmony, but you use reasoning to check if it's fair and workable. This shows in your mentoring as steady, caring advice that considers everyone, making growth feel supported and sensible. It's this consistent care that makes you someone people rely on for tough calls.",
            "You trust values because they help you prioritize the human element—like team morale or personal ethics—but you pair it with logic to make sure it's sound. When deciding, you start with feelings and right/wrong, then add cause-effect to strengthen it. This makes your guidance feel empathetic and effective, as you share why it matters to the heart and how it works in practice. It turns advice into action that people can trust.",
            "With this moderate values lean, you're excellent at building support in nurturing settings, like helping with conflicts or personal development, where you address emotional gaps with thoughtful solutions. You assess needs, consider impacts, pick paths that unite, and it works great with your visionary side for complete plans. Your help feels solid and kind, encouraging real talk and progress. It's this balanced empathy that drives lasting change.",
            "Your logic influence, moderate and steady, helps when care needs clarity, like organizing thoughts into steps for a decision. If emotions run high, you break it down logically to find common ground. This keeps your mentoring practical, avoiding fuzzy areas. It builds respect, as people see the thought behind your support.",
            "Overall, your moderate values side defines you as a Mentor who guides with steady compassion and clear thinking, making choices that stick. You approach decisions like a trusted advisor who weighs heart and head, creating outcomes that feel right and right. In any setting, your style fosters unity and growth. It's this reliable kindness that makes your impact deep and dependable.",
          ],
          strong: [
            "Your strong values preference means you decide based on what's deeply right for people and matches your core beliefs, putting feelings and impact first with real conviction. You dive into how choices affect harmony and well-being, using logic only if it supports the bigger good. This intense focus makes your mentoring powerful and heartfelt, helping people feel truly seen and motivated. It's this passion for what matters that drives big shifts in how they see themselves.",
            "You lead with values because they capture the essence of care—like protecting relationships or standing for fairness—but you're selective with logic to keep the focus pure. In challenges, you prioritize emotional and ethical sides, then add reasoning to back it up. This makes your advice feel urgent and true, as you explain the why behind the heart. It inspires action because people sense the depth of your commitment.",
            "This strong values lean makes you outstanding at creating deep support in emotional or group settings, like resolving tensions or inspiring change, where you tackle feelings head-on with unifying solutions. You identify core needs, weigh full impacts, choose paths that heal deeply, and it amplifies your big-picture thinking for transformative results. Your guidance feels intense and genuine, opening doors to vulnerability and growth. It's this heartfelt drive that creates ripples of positive change.",
            "Your logic side, with low influence, comes in sparingly, like adding structure when values need protection from chaos. If a caring choice seems off-track, you use if-thens to safeguard it. This keeps your mentoring focused, though it means stretching for details sometimes. It adds edge, making your strong care even more impactful when grounded.",
            "In the end, your strong values preference makes you a Mentor who leads with deep compassion and purpose, creating guidance that touches the soul. You handle decisions like a guardian of what's right, mixing heart with just enough head for power. In teams or one-on-one, your style unites and uplifts. It's this intense kindness that leaves a profound mark, as people live out the values you help them embrace.",
          ],
        },
        {
          title: (primaryPct, secPct, domLevel, infLevel) =>
            `Inward (I) [${primaryPct}% – ${domLevel.toLowerCase()} dominance] vs. Outward (O) [${secPct}% – ${infLevel.toLowerCase()} influence] on Energy Orientation`,
          mild: [
            "Your mild inward focus means you get your energy from thinking things over inside, but you're comfortable reaching out when it helps, creating a nice balance for recharging and connecting. You enjoy quiet time to process ideas or feelings, like reflecting on a conversation to see what it means, but you also gain from talking it out with others. This flexibility shows in mentoring, where you can go deep alone but bring fresh energy to group talks. It makes your support feel personal yet engaging, as you use inner clarity to connect better.",
            "This inward lean isn't about hiding away—it's about building strength from within, turning thoughts into better actions, while still drawing from outside input to stay rounded. When facing a challenge, you take time to sort your ideas before sharing, but you seek feedback to refine them. This makes your mentoring thoughtful and collaborative, as you offer insights that feel considered and open. It helps people see you as someone who listens inside and out.",
            "With mild inward energy, you're great at roles that mix solo reflection with team input, like planning personal growth or facilitating discussions, where you think deeply then share clearly. You recharge by mulling over experiences, pairing it with your visionary and caring sides for well-rounded advice. Your energy feels steady and inviting, making sessions productive. It's this balanced recharge that keeps your guidance fresh and effective.",
            "Your outward side, with high influence, is a strong pull to engage—it encourages you to connect and gather ideas when reflection needs a boost. If you're stuck inside your head, you talk it out to get perspective. This keeps your mentoring dynamic, avoiding isolation. It adds warmth, as people feel your interest in their views.",
            "Overall, your mild inward preference makes you a Mentor who thinks deeply but stays connected, fueling guidance that's insightful and approachable. You handle energy like a thinker who loves good talks, mixing quiet power with social spark for real impact. In any setting, your style energizes without draining. It's this even flow that makes your help sustainable and inspiring.",
          ],
          moderate: [
            "Your moderate inward focus gives you reliable energy from reflection, strong enough to go deep but open to outside stimulation for balance. You thrive on processing internally, like analyzing a problem to find patterns, but you recharge through meaningful interactions too. This consistency helps in mentoring, where you prepare thoughtfully but show up fully engaged. It makes your presence steady and energizing, building trust over time.",
            "This inward style builds from quiet strength, turning personal insights into shared value, while using external cues to sharpen them. When guiding, you reflect on key points first, then discuss to test and improve. This makes your advice feel prepared and responsive, drawing from both worlds. People appreciate how you bring depth to conversations.",
            "With moderate inward energy, you excel in thoughtful settings like coaching or team retrospectives, where you reflect to offer clear paths. It pairs with your abstract and values sides for complete support. Your vibe is calm yet active, keeping things moving. It's this reliable energy that sustains long-term growth.",
            "Your outward influence, moderate and useful, pulls you to connect when needed, like seeking input to expand your thoughts. If reflection loops, you reach out for fresh angles. This keeps mentoring collaborative, avoiding overthinking. It adds connection, making your insights land better.",
            "In summary, your moderate inward side defines you as a Mentor who recharges thoughtfully but engages well, creating guidance that's deep and direct. You manage energy like a planner who enjoys the team, blending solo power with group boost. Your approach keeps things flowing. It's this steady spark that makes your impact consistent and strong.",
          ],
          strong: [
            "Your strong inward focus means you get most of your energy from deep reflection, diving into thoughts and feelings to recharge, with less need for constant outside buzz. You love time alone to unpack ideas, like pondering a mentoring challenge to find the core, which leads to powerful insights. This intensity makes your guidance rich and focused, helping people see things clearly. It's this inner drive that gives your support its depth and staying power.",
            "This inward energy is about building from within, creating strong foundations for what you share, though you tap outside sources sparingly for confirmation. In sessions, you process deeply before speaking, offering advice that's well-honed. This makes your mentoring feel profound and intentional, as you draw from a full inner well. People feel the weight of your words because they come from real thought.",
            "With strong inward lean, you shine in reflective work like personal advising or strategy sessions, where you go deep to deliver breakthroughs. It amplifies your visionary and caring traits for impactful results. Your energy is quiet but potent, drawing people in. It's this focused fuel that creates meaningful shifts.",
            "Your outward side, low but key, helps when you need to connect or get new views, like bouncing ideas off someone to test them. If isolation creeps in, you step out briefly. This keeps your mentoring from getting too closed off. It adds a touch of outreach, making your depth more accessible.",
            "Ultimately, your strong inward preference makes you a Mentor who leads from a place of deep knowing, fueling guidance that's authentic and transformative. You handle energy like a sage who chooses words carefully, mixing inner strength with selective sharing. Your style resonates deeply. It's this quiet power that leaves a strong, lasting echo.",
          ],
        },
        {
          title: (primaryPct, secPct, domLevel, infLevel) =>
            `Structure (S) [${primaryPct}% – ${domLevel.toLowerCase()} dominance] vs. Flexibility (F) [${secPct}% – ${infLevel.toLowerCase()} influence] on Change Approach`,
          mild: [
            "Your mild preference for structure means you like having plans and routines to feel secure, but you're okay adapting when things change, keeping a good balance. You enjoy organizing steps for tasks, like outlining a mentoring plan, but you can roll with surprises without stress. This flexibility helps in dynamic situations, where you provide stability but stay open. It makes your support feel reliable yet easygoing, as people know you've got a plan but won't freak if it shifts.",
            "When you favor structure, it's for the comfort of knowing what's next, but you use flexibility to adjust for better outcomes. In mentoring, you set clear goals but tweak based on feedback. This makes your guidance practical and responsive, as you build a framework that fits real life. It turns plans into tools that work for everyone.",
            "This mild structure lean is perfect for roles like organizing growth sessions or team check-ins, where you create order but allow for input. It pairs with your other traits for adaptable plans. Your approach feels steady and inviting, encouraging progress. It's this balanced order that makes things smooth.",
            "Your flexibility side, high and helpful, lets you pivot when needed, like changing a plan for new info. If rigidity sets in, you loosen up to keep momentum. This keeps mentoring fresh, avoiding stuck spots. It adds ease, making your structure more approachable.",
            "Overall, your mild structure preference makes you a Mentor who builds clear paths with room to wander, creating support that's solid but not stiff. You handle change like a host who plans the party but lets guests lead the dance. Your style fosters confidence. It's this adaptable order that helps people thrive.",
          ],
          moderate: [
            "Your moderate structure preference gives you a strong sense of organization for handling the world, preferring plans and closure but able to flex when necessary. You feel best with routines, like scheduling mentoring follow-ups, but you adjust for unexpected turns. This reliability shines in your guidance, providing a backbone that keeps things on track. It's this steady setup that makes your support trustworthy and effective.",
            "You lean on structure for the security of knowing outcomes, but use moderate flexibility to improve as you go. When guiding, you outline steps but refine based on progress. This makes your advice consistent and practical, as you create frameworks that evolve. It helps people see the road ahead clearly.",
            "With moderate structure, you're great at steady tasks like development programs or group planning, where you set the pace but allow tweaks. It works well with your visionary and caring sides for complete strategies. Your energy is organized and open, driving results. It's this reliable flow that builds success.",
            "Your flexibility influence, moderate, helps you adapt without losing control, like shifting priorities for better fit. If plans lag, you adjust to catch up. This keeps mentoring dynamic, balancing order with opportunity. It adds practicality, making your structure stronger.",
            "In the end, your moderate structure side makes you a Mentor who creates dependable frameworks with smart adjustments, guiding with clarity and care. You manage the outer world like a coach who maps the field but plays the game. Your approach delivers. It's this balanced build that leads to real wins.",
          ],
          strong: [
            "Your strong structure preference means you thrive on plans and organization, seeking closure and predictability to tackle the world effectively. You prefer detailed routines, like mapping out a full mentoring timeline, and changes can feel disruptive unless they fit the big picture. This focus makes your guidance firm and directed, helping people stay on course. It's this solid approach that gives your support its power and purpose.",
            "You rely on structure for the confidence it brings, building systems that work, with flexibility only for essential shifts. In mentoring, you create step-by-step paths but stick to them closely. This makes your advice clear and actionable, as you ensure every part connects. It drives progress that people can count on.",
            "This strong structure lean excels in organized settings like project leading or skill-building programs, where you set strong foundations. It enhances your abstract and values traits for thorough results. Your style is decisive and detailed, achieving goals. It's this firm frame that creates impact.",
            "Your flexibility side, low, steps in rarely, like when a plan needs a quick fix to survive. If rigidity blocks, you bend just enough. This keeps mentoring focused, though it means practicing adaptability. It sharpens your strengths, making order even more effective.",
            "Ultimately, your strong structure preference makes you a Mentor who builds lasting frameworks with precision, guiding toward success. You approach the world like an architect who designs for durability, mixing plans with purpose. Your method works. It's this strong setup that turns visions into victories.",
          ],
        },
        {
          title: (primaryPct, secPct, domLevel, infLevel) =>
            `Harmony (H) [${primaryPct}% – ${domLevel.toLowerCase()} dominance] vs. Autonomy (A) [${secPct}% – ${infLevel.toLowerCase()} influence] on Interpersonal Style`,
          mild: [
            "Your mild harmony preference means you're motivated by group goals and collaboration, but you value personal space too, keeping a healthy balance. You enjoy working with others toward common aims, like team mentoring projects, but you can step back for solo work when it helps. This flexibility makes your approach inclusive yet independent, fitting different group sizes. It's this even mix that makes your leadership feel welcoming and effective.",
            "When you focus on harmony, it's to build unity and shared success, but you use autonomy to recharge or innovate alone. In groups, you align efforts but take time for your ideas. This makes your mentoring collaborative and creative, as you blend inputs wisely. People feel included because you make space for all.",
            "This mild harmony lean is ideal for mixed settings like workshops or peer coaching, where you foster connection with room for individual input. It complements your other traits for well-rounded teams. Your style is connective and capable, building bonds. It's this balanced drive that strengthens groups.",
            "Your autonomy side, high, lets you pursue personal goals when needed, like developing an idea on your own before sharing. If group pressure builds, you claim space to think. This keeps mentoring fresh, avoiding burnout. It adds depth, making your harmony more genuine.",
            "Overall, your mild harmony preference makes you a Mentor who thrives on teamwork with personal freedom, creating dynamics that empower everyone. You lead like a facilitator who values voices, mixing collective energy with individual spark. Your way unites. It's this adaptable motivation that fosters true progress.",
          ],
          moderate: [
            "Your moderate harmony preference drives you toward group objectives and cooperation, strong but with room for self-reliance. You feel good contributing to team goals, like coordinating mentoring circles, but you balance it with independent tasks. This reliability makes your style team-focused yet sustainable, guiding groups smoothly. It's this steady collaboration that builds strong connections.",
            "You prioritize harmony to achieve shared wins, using moderate autonomy to contribute uniquely. In teams, you sync efforts but add your touch. This makes your guidance cohesive and innovative, drawing from the group while standing out. It creates environments where everyone contributes.",
            "With moderate harmony, you're effective in collaborative roles like group facilitation or partner development, where you unite while allowing space. It pairs with your visionary and caring sides for dynamic teams. Your energy is unifying and productive, achieving more together. It's this reliable motivation that drives results.",
            "Your autonomy influence, moderate, helps you maintain boundaries, like taking time for solo reflection in busy groups. If over-connected, you pull back to recharge. This keeps mentoring balanced, preventing overload. It enhances your harmony, making it sustainable.",
            "In summary, your moderate harmony side makes you a Mentor who excels at team-driven guidance with personal balance, creating supportive dynamics. You motivate like a coordinator who inspires input, blending group power with individual input. Your approach succeeds. It's this consistent connection that leads to shared growth.",
          ],
          strong: [
            "Your strong harmony preference means you're deeply motivated by collective goals and working together, putting group success first with real dedication. You love aligning with teams, like leading mentoring cohorts, and independence takes a back seat unless it serves the whole. This focus makes your leadership unifying and intense, pulling people toward common aims. It's this team passion that makes your impact so collective and strong.",
            "You lead with harmony to create unity and progress, using low autonomy for personal contributions that fit the group. In collaborations, you prioritize shared direction but infuse your ethics. This makes your mentoring immersive and purposeful, as you build from the team's energy. It fosters belonging that motivates action.",
            "This strong harmony lean shines in group-heavy roles like team building or community coaching, where you create tight-knit progress. It boosts your abstract and values traits for powerful unity. Your style is immersive and directive, forging bonds. It's this deep drive that transforms groups.",
            "Your autonomy side, low, emerges when needed, like stepping away briefly to align with group needs. If isolation calls, you reconnect quickly. This keeps mentoring group-centered, though it means guarding personal time. It sharpens your harmony, making it more vibrant.",
            "Ultimately, your strong harmony preference makes you a Mentor who thrives on collective motivation, creating guidance that unites and uplifts. You drive like a unifier who channels shared will, mixing team energy with focused care. Your method binds. It's this intense togetherness that sparks collective change.",
          ],
        },
      ],
    },
    relationships: {
      mild: [
        "As a Mentor type, your cognitive blueprint fosters steady bonds, where mild preferences may lean slightly toward one dimensional pole, posing minor challenges but building reliable connections when your partner’s results balance your intensity. You bring a wise, nurturing presence that blends inspiration with practicality, forming partnerships that feel secure and collaborative with complementary preferences. This steadiness fosters uplifting harmony when your partner’s style aligns with yours, making relationships feel rewarding and balanced.",
      ],
      moderate: [
        "As a Mentor type, your cognitive blueprint fosters deep bonds, where moderate preferences may lean toward one dimensional pole, posing challenges but offering profound connections when your partner’s results balance your intensity. You bring a wise, nurturing presence that fuels meaningful partnerships, creating lasting ties when aligned with complementary preferences. This depth can inspire uplifting harmony if your partner’s style offsets potential extremes, making relationships feel enriching and purposeful.",
      ],
      strong: [
        "As a Mentor type, your cognitive blueprint fosters deep bonds, where strong preferences may lean heavily toward one dimensional pole, posing challenges but offering profound connections when your partner’s results balance your intensity. You bring a wise, nurturing presence that fuels meaningful partnerships, creating lasting ties when aligned with complementary preferences. This depth can inspire uplifting harmony if your partner’s style offsets potential extremes, making relationships feel enriching and purposeful.",
      ],
    },
  },
};

// Dimensions: 0: C/N, 1: L/V, 2: I/O, 3: S/F, 4: H/A
// Poles: [ ['C', 'N'], ['L', 'V'], ['I', 'O'], ['S', 'F'], ['H', 'A'] ]
export const poles = [
  ["C", "N"],
  ["L", "V"],
  ["I", "O"],
  ["S", "F"],
  ["H", "A"],
];

// Helper to get primary/secondary poles and percentages for a dimension
export function getDimPoles(dimIndex, dominants, percents) {
  const primaryPole = dominants[dimIndex];
  const p1Pct = Math.round(percents[dimIndex].p1);
  const primaryPct = primaryPole === poles[dimIndex][0] ? p1Pct : 100 - p1Pct;
  const secPct = 100 - primaryPct;
  const secPole = primaryPole === poles[dimIndex][0] ? poles[dimIndex][1] : poles[dimIndex][0];
  return { primaryPole, primaryPct, secPole, secPct };
}

export const questions = [
  // Dimension 0: C/N
  {
    id: 0,
    dimension: 0,
    type: "likert",
    text: "In my job or studies, I focus on verifiable facts and practical details rather than theoretical ideas.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 1,
    dimension: 0,
    type: "likert",
    text: 'During hobbies like reading or gaming, I get energized by exploring "what if" scenarios and hidden meanings.',
    favoring: "N",
    reverse: false,
  },
  {
    id: 2,
    dimension: 0,
    type: "likert",
    text: "When making everyday purchases, I rely on real-world reviews and specs more than imagining future uses.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 3,
    dimension: 0,
    type: "likert",
    text: "I rarely get caught up in daydreams about abstract concepts or future possibilities.",
    favoring: "N",
    reverse: true,
  },
  {
    id: 4,
    dimension: 0,
    type: "forced-select",
    text: "In a family discussion about vacation plans, what captures your interest first?",
    options: [
      { key: "a", label: "Specific details like costs and locations available now.", value: { C: 5, N: 1 } },
      { key: "b", label: "Potential adventures and unique experiences that could unfold.", value: { C: 1, N: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { C: 4, N: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { C: 2, N: 4 } },
      { key: "e", label: "Equally balanced between both.", value: { C: 3, N: 3 } },
    ],
  },
  {
    id: 5,
    dimension: 0,
    type: "likert",
    text: 'In relationships, I prefer discussing concrete events from the day over philosophical "what could be" talks.',
    favoring: "C",
    reverse: false,
  },
  {
    id: 6,
    dimension: 0,
    type: "likert",
    text: "I enjoy puzzles or activities that involve connecting disparate ideas into innovative patterns.",
    favoring: "N",
    reverse: false,
  },
  {
    id: 7,
    dimension: 0,
    type: "likert",
    text: "Abstract theories and metaphors do not help me make sense of the world as much as straightforward facts do.",
    favoring: "N",
    reverse: true,
  },
  {
    id: 8,
    dimension: 0,
    type: "likert",
    text: "When learning a new skill, like cooking, I stick to proven recipes rather than experimenting with untested combinations.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 9,
    dimension: 0,
    type: "rank",
    text: "Rank these in order of preference when researching a topic (1 = most preferred, 3 = least):",
    options: [
      { key: "a", label: "Collecting observable data and evidence.", pole: "C" },
      { key: "b", label: "Analyzing trends and theoretical implications.", pole: "N" },
      { key: "c", label: "Treating both equally.", pole: "balanced" },
    ],
  },
  {
    id: 10,
    dimension: 0,
    type: "likert",
    text: "In daily routines, I prioritize what's happening right now over speculating about long-term trends.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 11,
    dimension: 0,
    type: "likert",
    text: "I don't often synthesize information from various sources to create new insights.",
    favoring: "N",
    reverse: true,
  },
  {
    id: 12,
    dimension: 0,
    type: "forced-select",
    text: "Choosing a new hobby, like art or sports, which approach feels right?",
    options: [
      { key: "a", label: "Based on practical tools and immediate steps.", value: { C: 5, N: 1 } },
      { key: "b", label: "Inspired by creative potentials and ideas.", value: { C: 1, N: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { C: 4, N: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { C: 2, N: 4 } },
      { key: "e", label: "Equally balanced.", value: { C: 3, N: 3 } },
    ],
  },
  {
    id: 13,
    dimension: 0,
    type: "likert",
    text: "I trust my direct senses more than intuitive hunches in social situations.",
    favoring: "C",
    reverse: false,
  },
  {
    id: 14,
    dimension: 0,
    type: "forced-select",
    text: "Which best matches your overall perception style?",
    options: [
      { key: "a", label: "Anchored in the tangible and present.", value: { C: 5, N: 1 } },
      { key: "b", label: "Drawn to possibilities and connections.", value: { C: 1, N: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { C: 4, N: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { C: 2, N: 4 } },
      { key: "e", label: "Perfectly balanced.", value: { C: 3, N: 3 } },
    ],
  },
  // Dimension 1: L/V
  {
    id: 15,
    dimension: 1,
    type: "likert",
    text: "In work decisions, I emphasize logical efficiency over emotional effects on colleagues.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 16,
    dimension: 1,
    type: "likert",
    text: "When facing ethical dilemmas in life, I consider how choices align with personal values and affect others' well-being.",
    favoring: "V",
    reverse: false,
  },
  {
    id: 17,
    dimension: 1,
    type: "likert",
    text: "I base judgments on cause-and-effect principles rather than subjective feelings.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 18,
    dimension: 1,
    type: "likert",
    text: "People's emotions and relationships rarely take priority over factual analysis in my choices.",
    favoring: "V",
    reverse: true,
  },
  {
    id: 19,
    dimension: 1,
    type: "forced-select",
    text: "Resolving a disagreement with a friend, what guides you?",
    options: [
      { key: "a", label: "Objective facts and fair principles.", value: { L: 5, V: 1 } },
      { key: "b", label: "Empathy for feelings and harmony.", value: { L: 1, V: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { L: 4, V: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { L: 2, V: 4 } },
      { key: "e", label: "Equally balanced.", value: { L: 3, V: 3 } },
    ],
  },
  {
    id: 20,
    dimension: 1,
    type: "likert",
    text: "In group projects, I seek systemic consistency more than boosting team morale.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 21,
    dimension: 1,
    type: "likert",
    text: "Decisions that foster positive human connections feel more satisfying than purely rational ones.",
    favoring: "V",
    reverse: false,
  },
  {
    id: 22,
    dimension: 1,
    type: "likert",
    text: "I don't often let personal ethics override logical outcomes.",
    favoring: "V",
    reverse: true,
  },
  {
    id: 23,
    dimension: 1,
    type: "likert",
    text: "When budgeting money, I use impersonal calculations over considering family impacts.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 24,
    dimension: 1,
    type: "rank",
    text: "Rank these in order of priority for judgments (1 = most, 3 = least):",
    options: [
      { key: "a", label: "Analytical truth and effectiveness.", pole: "L" },
      { key: "b", label: "Values-driven impact on people.", pole: "V" },
      { key: "c", label: "Equal emphasis on both.", pole: "balanced" },
    ],
  },
  {
    id: 25,
    dimension: 1,
    type: "likert",
    text: "Fairness through logic trumps empathy in tough choices.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 26,
    dimension: 1,
    type: "likert",
    text: "Understanding others' perspectives isn't as crucial as objective evaluation.",
    favoring: "V",
    reverse: true,
  },
  {
    id: 27,
    dimension: 1,
    type: "forced-select",
    text: "Selecting a community volunteer role, which factor weighs more?",
    options: [
      { key: "a", label: "Practical results and strategy.", value: { L: 5, V: 1 } },
      { key: "b", label: "Building relationships and support.", value: { L: 1, V: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { L: 4, V: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { L: 2, V: 4 } },
      { key: "e", label: "Equally balanced.", value: { L: 3, V: 3 } },
    ],
  },
  {
    id: 28,
    dimension: 1,
    type: "likert",
    text: "I prefer solutions based on evidence over those centered on compassion.",
    favoring: "L",
    reverse: false,
  },
  {
    id: 29,
    dimension: 1,
    type: "forced-select",
    text: "Which describes your decision style best?",
    options: [
      { key: "a", label: "Logic-oriented and impersonal.", value: { L: 5, V: 1 } },
      { key: "b", label: "Value-oriented and empathetic.", value: { L: 1, V: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { L: 4, V: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { L: 2, V: 4 } },
      { key: "e", label: "Perfectly balanced.", value: { L: 3, V: 3 } },
    ],
  },
  // Dimension 2: I/O
  {
    id: 30,
    dimension: 2,
    type: "likert",
    text: "I gain energy from solitary reflection and inner thoughts during downtime.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 31,
    dimension: 2,
    type: "likert",
    text: "Engaging with others or the environment revives me more than alone time.",
    favoring: "O",
    reverse: false,
  },
  {
    id: 32,
    dimension: 2,
    type: "likert",
    text: "In work settings, I process ideas internally before contributing.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 33,
    dimension: 2,
    type: "likert",
    text: "Social interactions and activities don't energize me as much as quiet contemplation.",
    favoring: "O",
    reverse: true,
  },
  {
    id: 34,
    dimension: 2,
    type: "forced-select",
    text: "After a challenging task, how do you recharge?",
    options: [
      { key: "a", label: "Alone, thinking or relaxing inwardly.", value: { I: 5, O: 1 } },
      { key: "b", label: "Out with friends or in active pursuits.", value: { I: 1, O: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { I: 4, O: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { I: 2, O: 4 } },
      { key: "e", label: "Equally balanced.", value: { I: 3, O: 3 } },
    ],
  },
  {
    id: 35,
    dimension: 2,
    type: "likert",
    text: "Deep personal contemplation stimulates me more than external events.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 36,
    dimension: 2,
    type: "likert",
    text: "I thrive on interactions and real-world experiences for motivation.",
    favoring: "O",
    reverse: false,
  },
  {
    id: 37,
    dimension: 2,
    type: "likert",
    text: "Jumping into action without much prior thought isn't my preferred way.",
    favoring: "O",
    reverse: true,
  },
  {
    id: 38,
    dimension: 2,
    type: "likert",
    text: "In self-care routines, I prefer quiet activities like journaling over outings.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 39,
    dimension: 2,
    type: "rank",
    text: "Rank these for energy sources (1 = most, 3 = least):",
    options: [
      { key: "a", label: "Internal processing and solitude.", pole: "I" },
      { key: "b", label: "External engagement and action.", pole: "O" },
      { key: "c", label: "Equal balance.", pole: "balanced" },
    ],
  },
  {
    id: 40,
    dimension: 2,
    type: "likert",
    text: "My focus is more on my inner world than on surrounding stimuli.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 41,
    dimension: 2,
    type: "likert",
    text: "Prolonged alone time doesn't recharge me like being out and about does.",
    favoring: "I",
    reverse: true,
  },
  {
    id: 42,
    dimension: 2,
    type: "forced-select",
    text: "At a cultural event, like a festival, what's comfortable?",
    options: [
      { key: "a", label: "Observing quietly and reflecting.", value: { I: 5, O: 1 } },
      { key: "b", label: "Participating and interacting actively.", value: { I: 1, O: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { I: 4, O: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { I: 2, O: 4 } },
      { key: "e", label: "Equally balanced.", value: { I: 3, O: 3 } },
    ],
  },
  {
    id: 43,
    dimension: 2,
    type: "likert",
    text: "I need solitude after busy periods to restore energy.",
    favoring: "I",
    reverse: false,
  },
  {
    id: 44,
    dimension: 2,
    type: "forced-select",
    text: "Which fits your energy style?",
    options: [
      { key: "a", label: "Inward, thoughtful, and reserved.", value: { I: 5, O: 1 } },
      { key: "b", label: "Outward, interactive, and dynamic.", value: { I: 1, O: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { I: 4, O: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { I: 2, O: 4 } },
      { key: "e", label: "Perfectly balanced.", value: { I: 3, O: 3 } },
    ],
  },
  // Dimension 3: S/F
  {
    id: 45,
    dimension: 3,
    type: "likert",
    text: "I like detailed plans and routines for daily tasks to ensure predictability.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 46,
    dimension: 3,
    type: "likert",
    text: "Adapting on the fly to new opportunities excites me more than sticking to schedules.",
    favoring: "F",
    reverse: false,
  },
  {
    id: 47,
    dimension: 3,
    type: "likert",
    text: "In hobbies, I prefer organized steps over impromptu changes.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 48,
    dimension: 3,
    type: "likert",
    text: "Rigid structures and closures don't appeal to me as much as keeping things open-ended.",
    favoring: "S",
    reverse: true,
  },
  {
    id: 49,
    dimension: 3,
    type: "forced-select",
    text: "Organizing a home event, like a dinner, what's your style?",
    options: [
      { key: "a", label: "Detailed agenda and preparations.", value: { S: 5, F: 1 } },
      { key: "b", label: "Loose ideas, adjusting as guests arrive.", value: { S: 1, F: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { S: 4, F: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { S: 2, F: 4 } },
      { key: "e", label: "Equally balanced.", value: { S: 3, F: 3 } },
    ],
  },
  {
    id: 50,
    dimension: 3,
    type: "likert",
    text: "Stability through planning helps me handle life's uncertainties.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 51,
    dimension: 3,
    type: "likert",
    text: "Flexibility allows me to embrace surprises in relationships.",
    favoring: "F",
    reverse: false,
  },
  {
    id: 52,
    dimension: 3,
    type: "likert",
    text: "Spontaneity and open options aren't as comfortable as having everything mapped out.",
    favoring: "F",
    reverse: true,
  },
  {
    id: 53,
    dimension: 3,
    type: "likert",
    text: "At work, I aim for quick decisions to achieve closure.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 54,
    dimension: 3,
    type: "rank",
    text: "Rank these for dealing with change (1 = most, 3 = least):",
    options: [
      { key: "a", label: "Structured organization and stability.", pole: "S" },
      { key: "b", label: "Flexible adaptation and openness.", pole: "F" },
      { key: "c", label: "Equal balance.", pole: "balanced" },
    ],
  },
  {
    id: 55,
    dimension: 3,
    type: "likert",
    text: "I organize my environment to minimize unexpected shifts.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 56,
    dimension: 3,
    type: "likert",
    text: "Fixed plans don't motivate me like the thrill of improvisation does.",
    favoring: "S",
    reverse: true,
  },
  {
    id: 57,
    dimension: 3,
    type: "forced-select",
    text: "On a road trip, which feels natural?",
    options: [
      { key: "a", label: "Pre-booked routes and stops.", value: { S: 5, F: 1 } },
      { key: "b", label: "Detours based on discoveries.", value: { S: 1, F: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { S: 4, F: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { S: 2, F: 4 } },
      { key: "e", label: "Equally balanced.", value: { S: 3, F: 3 } },
    ],
  },
  {
    id: 58,
    dimension: 3,
    type: "likert",
    text: "Completing tasks with structure satisfies me over endless exploration.",
    favoring: "S",
    reverse: false,
  },
  {
    id: 59,
    dimension: 3,
    type: "forced-select",
    text: "Which describes your change approach?",
    options: [
      { key: "a", label: "Structured, planned, and orderly.", value: { S: 5, F: 1 } },
      { key: "b", label: "Adaptive, spontaneous, and flexible.", value: { S: 1, F: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { S: 4, F: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { S: 2, F: 4 } },
      { key: "e", label: "Perfectly balanced.", value: { S: 3, F: 3 } },
    ],
  },
  // Dimension 4: H/A
  {
    id: 60,
    dimension: 4,
    type: "likert",
    text: "In team activities, like sports, I prioritize group harmony and shared goals.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 61,
    dimension: 4,
    type: "likert",
    text: "Pursuing individual projects where I control the direction motivates me most.",
    favoring: "A",
    reverse: false,
  },
  {
    id: 62,
    dimension: 4,
    type: "likert",
    text: "In family settings, I focus on building consensus for collective well-being.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 63,
    dimension: 4,
    type: "likert",
    text: "Working toward group successes doesn't fulfill me as much as personal achievements do.",
    favoring: "H",
    reverse: true,
  },
  {
    id: 64,
    dimension: 4,
    type: "forced-select",
    text: "In a community volunteer group, what's your impulse?",
    options: [
      { key: "a", label: "Collaborating for team cohesion.", value: { H: 5, A: 1 } },
      { key: "b", label: "Handling tasks independently.", value: { H: 1, A: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { H: 4, A: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { H: 2, A: 4 } },
      { key: "e", label: "Equally balanced.", value: { H: 3, A: 3 } },
    ],
  },
  {
    id: 65,
    dimension: 4,
    type: "likert",
    text: "Collective efforts and unity drive my career choices.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 66,
    dimension: 4,
    type: "likert",
    text: "Maintaining personal freedom is more important than team dependencies.",
    favoring: "A",
    reverse: false,
  },
  {
    id: 67,
    dimension: 4,
    type: "likert",
    text: "Individual objectives aren't as rewarding as contributing to a team.",
    favoring: "A",
    reverse: true,
  },
  {
    id: 68,
    dimension: 4,
    type: "likert",
    text: "I orient actions toward group dynamics in social circles.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 69,
    dimension: 4,
    type: "rank",
    text: "Rank these motivations (1 = most, 3 = least):",
    options: [
      { key: "a", label: "Harmony in collaboration.", pole: "H" },
      { key: "b", label: "Autonomy in independence.", pole: "A" },
      { key: "c", label: "Equal balance.", pole: "balanced" },
    ],
  },
  {
    id: 70,
    dimension: 4,
    type: "likert",
    text: "Shared successes feel better than solo victories.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 71,
    dimension: 4,
    type: "likert",
    text: "Team-oriented environments don't suit me like solitary pursuits do.",
    favoring: "H",
    reverse: true,
  },
  {
    id: 72,
    dimension: 4,
    type: "forced-select",
    text: "In a work meeting, how do you contribute?",
    options: [
      { key: "a", label: "Mediating for group agreement.", value: { H: 5, A: 1 } },
      { key: "b", label: "Advocating your own ideas.", value: { H: 1, A: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { H: 4, A: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { H: 2, A: 4 } },
      { key: "e", label: "Equally balanced.", value: { H: 3, A: 3 } },
    ],
  },
  {
    id: 73,
    dimension: 4,
    type: "likert",
    text: "I thrive on collective goals over personal boundaries.",
    favoring: "H",
    reverse: false,
  },
  {
    id: 74,
    dimension: 4,
    type: "forced-select",
    text: "Which fits your interpersonal motivation?",
    options: [
      { key: "a", label: "Collaborative and group-focused.", value: { H: 5, A: 1 } },
      { key: "b", label: "Autonomous and self-reliant.", value: { H: 1, A: 5 } },
      { key: "c", label: "A mix, leaning toward a.", value: { H: 4, A: 2 } },
      { key: "d", label: "A mix, leaning toward b.", value: { H: 2, A: 4 } },
      { key: "e", label: "Perfectly balanced.", value: { H: 3, A: 3 } },
    ],
  },
];

// Archetype map (from CSM framework)
export const archetypes = {
  "C-L-O-S-H": {
    name: "Architect",
    description: "A pragmatic builder who organizes teams to construct enduring, logical systems.",
  },
  "C-L-O-S-A": {
    name: "Engineer",
    description: "An independent builder who crafts practical, efficient solutions autonomously.",
  },
  "C-L-O-F-H": {
    name: "Navigator",
    description: "A dynamic leader who steers teams through shifting realities with quick, tangible insights.",
  },
  "C-L-O-F-A": {
    name: "Pioneer",
    description: "A bold trailblazer who seizes opportunities with fearless, independent action.",
  },
  "C-L-I-S-H": {
    name: "Curator",
    description: "A thoughtful preserver who organizes information to build shared, logical frameworks.",
  },
  "C-L-I-S-A": {
    name: "Analyst",
    description: "A precise thinker who dissects complex systems with solitary, focused logic.",
  },
  "C-L-I-F-H": {
    name: "Mediator",
    description:
      "A flexible problem-solver who uses detailed observation to find logical solutions that maintain group balance.",
  },
  "C-L-I-F-A": {
    name: "Maverick",
    description: "An unconventional realist who leverages an internal database of facts to forge their own path.",
  },
  "C-V-O-S-H": {
    name: "Steward",
    description: "A caring organizer who fosters stability and practical well-being for the community.",
  },
  "C-V-O-S-A": {
    name: "Artisan",
    description: "A hands-on creator who shapes the tangible world according to their personal aesthetic and values.",
  },
  "C-V-O-F-H": {
    name: "Campaigner",
    description: "A passionate advocate who inspires teams to action through engaging with real-world needs.",
  },
  "C-V-O-F-A": {
    name: "Adventurer",
    description: "A free-spirited explorer who immerses themselves in new experiences, guided by their impulses.",
  },
  "C-V-I-S-H": {
    name: "Counselor",
    description: "A nurturing guide who provides steady, compassionate support based on shared values.",
  },
  "C-V-I-S-A": {
    name: "Healer",
    description: "A quiet caretaker who works independently to restore balance based on their deep personal ethics.",
  },
  "C-V-I-F-H": {
    name: "Peacemaker",
    description:
      "A gentle adapter who fosters group harmony by being sensitive to the details of personal experiences.",
  },
  "C-V-I-F-A": {
    name: "Empath",
    description:
      "A sensitive individualist who navigates their personal journey attuned to their inner emotional landscape.",
  },
  "N-L-O-S-H": {
    name: "Strategist",
    description: "A visionary planner who organizes teams to execute complex, long-range plans.",
  },
  "N-L-O-S-A": {
    name: "Inventor",
    description: "An ingenious creator who structures groundbreaking ideas into workable, independent projects.",
  },
  "N-L-O-F-H": {
    name: "Disruptor",
    description: "A bold innovator who challenges norms by mobilizing groups around new possibilities.",
  },
  "N-L-O-F-A": {
    name: "Revolutionary",
    description: "A radical thinker who redefines possibilities through fearless, independent exploration of ideas.",
  },
  "N-L-I-S-H": {
    name: "Academic",
    description: "A reflective scholar who builds stable, collaborative theories through deep logical inquiry.",
  },
  "N-L-I-S-A": {
    name: "Theorist",
    description: "A deep thinker who seeks universal truth through solitary abstract analysis.",
  },
  "N-L-I-F-H": {
    name: "Innovator",
    description: "A creative synthesizer who adapts their vision to logical frameworks in collaboration with others.",
  },
  "N-L-I-F-A": {
    name: "Visionary",
    description: "A far-sighted dreamer who crafts bold futures based on their independent and complex inner world.",
  },
  "N-V-O-S-H": {
    name: "Ambassador",
    description: "A harmonious connector who builds bridges between people using a stable vision of shared values.",
  },
  "N-V-O-S-A": {
    name: "Artist",
    description:
      "An expressive individualist who creates works of beauty that embody their abstract values and personal vision.",
  },
  "N-V-O-F-H": {
    name: "Catalyst",
    description:
      "An inspiring changemaker who sparks collective growth by exploring possibilities with adaptable empathy.",
  },
  "N-V-O-F-A": {
    name: "Wanderer",
    description: "A curious seeker who travels through the world of ideas in search of personal meaning.",
  },
  "N-V-I-S-H": {
    name: "Mentor",
    description:
      "A wise nurturer who guides others toward their potential using their deep, stable insight and compassion.",
  },
  "N-V-I-S-A": {
    name: "Sage",
    description: "A profound seeker who blends abstract values with solitary wisdom to arrive at a personal truth.",
  },
  "N-V-I-F-H": {
    name: "Unifier",
    description:
      "A gentle visionary who unites people by adapting their insightful vision to foster collective harmony.",
  },
  "N-V-I-F-A": {
    name: "Mystic",
    description:
      "An enigmatic soul who independently explores life’s mysteries, guided by their intuitive, compassionate inner world.",
  },
};

export function calculateCSMResults(answers) {
  const scores = Array(5)
    .fill(0)
    .map(() => ({ pole1: 0, pole2: 0 }));
  questions.forEach((q) => {
    const resp = answers[q.id];
    const dim = q.dimension;
    const p1 = poles[dim][0];
    const p2 = poles[dim][1];
    if (q.type === "likert") {
      let points = q.reverse ? 6 - resp : resp;
      if (q.favoring === p1) scores[dim].pole1 += points;
      else scores[dim].pole2 += points;
    } else if (q.type === "forced-select") {
      const opt = q.options.find((o) => o.key === resp);
      if (opt) {
        scores[dim].pole1 += opt.value[p1];
        scores[dim].pole2 += opt.value[p2];
      }
    } else if (q.type === "rank") {
      // resp: {a:1, b:2, c:3} (rank numbers)
      const rankPoints = { 1: 5, 2: 3, 3: 1 };
      Object.entries(resp).forEach(([key, rank]) => {
        const opt = q.options.find((o) => o.key === key);
        const pts = rankPoints[rank];
        if (opt.pole === p1) scores[dim].pole1 += pts;
        else if (opt.pole === p2) scores[dim].pole2 += pts;
        else if (opt.pole === "balanced") {
          scores[dim].pole1 += pts / 2;
          scores[dim].pole2 += pts / 2;
        }
      });
    }
  });

  const percents = scores.map((s) => {
    const total = s.pole1 + s.pole2 || 1; // Avoid div0
    return { p1: (s.pole1 / total) * 100, p2: (s.pole2 / total) * 100 };
  });

  const dominants = percents.map((p, i) => (p.p1 > p.p2 ? poles[i][0] : p.p1 < p.p2 ? poles[i][1] : "Balanced"));
  const typeCode = dominants.join("-");
  const archetype = archetypes[typeCode] || {
    name: "Balanced Type",
    description: "Perfectly balanced across dimensions.",
  };

  // Categorize strengths (Mild/Moderate/Strong for primary, High/Moderate/Low for secondary)
  const categories = percents.map((p, i) => {
    const primary = p.p1 > p.p2 ? "p1" : "p2";
    const primPct = primary === "p1" ? p.p1 : p.p2;
    let domLevel = "Mild";
    if (primPct > 85) domLevel = "Strong";
    else if (primPct > 65) domLevel = "Moderate";
    const secPct = 100 - primPct;
    let infLevel = "High";
    if (secPct < 15) infLevel = "Low";
    else if (secPct < 35) infLevel = "Moderate";
    return { domLevel, infLevel };
  });

  return { percents, dominants, typeCode, archetype, categories };
}
