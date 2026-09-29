// Persona-specific configurations and customizations
export const PERSONA_CONFIGS = {
  max: {
    location: {
      extraItems: ['Gym visits: Mon/Wed/Fri at 6am', 'Library study sessions: 10am-4pm daily', 'Weekend downtown hangouts: Saturday nights'],
      description: 'Ads for gaming cafes near campus, protein supplements near gym, coffee shops on your morning route, weekend bars and social spots downtown.',
      descriptionDe: 'Anzeigen für Gaming-Cafés auf dem Campus, Proteinpräparate in der Nähe des Fitnessstudios, Kaffeeshops auf Ihrer Morgenroute, Bars am Wochenende und Treffpunkte in der Innenstadt.',
      baseSources: [
        {
          permissionEmoji: '📍',
          permissionName: 'Location',
          insight: 'Gym visits: Mon/Wed/Fri at 6am',
          insightKey: 'sources.max.location.gym.insight',
          adResult: 'Protein supplements & fitness gear ads near gym',
          adResultKey: 'sources.max.location.gym.adResult',
        },
      ],
      microphone: [
        {
          permissionEmoji: '🎤',
          permissionName: 'Audio',
          insight: 'Conversations about gaming tournaments & wins',
          insightKey: 'sources.max.microphone.gaming.insight',
          adResult: 'Gaming peripherals & esports event ads',
          adResultKey: 'sources.max.microphone.gaming.adResult',
        },
        {
          permissionEmoji: '🎤',
          permissionName: 'Audio',
          insight: 'Fitness goals & gym discussion',
          insightKey: 'sources.max.microphone.fitness.insight',
          adResult: 'Premium workout and nutrition ads',
          adResultKey: 'sources.max.microphone.fitness.adResult',
        },
      ],
      notifications: [
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Morning gym session prep (5-6am spike)',
          insightKey: 'sources.max.notifications.morningGym.insight',
          adResult: 'Pre-workout ads & gym membership deals at 5am',
          adResultKey: 'sources.max.notifications.morningGym.adResult',
        },
      ],
    },
    camera: {
      items: ['Athletic build and casual college student style', 'Dorm room with gaming setup and fitness equipment'],
      description: 'They can see you in casual athletic wear at gym, in class at library, gaming at night. Your dorm setup reveals gaming interests and fitness focus.',
      descriptionDe: 'Sie können Sie in sportlicher Kleidung im Fitnessstudio sehen, im Unterricht in der Bibliothek, nachts beim Gaming. Ihr Zimmersetup zeigt Gaming-Interessen und Fitnessfokus.',
      sources: [
        {
          permissionEmoji: '📹',
          permissionName: 'Camera',
          insight: 'Athletic build in gym/casual college student style',
          insightKey: 'sources.max.camera.athletic.insight',
          adResult: 'Fitness & athletic brand targeting',
          adResultKey: 'sources.max.camera.athletic.adResult',
        },
        {
          permissionEmoji: '📹',
          permissionName: 'Camera',
          insight: 'Dorm room with gaming setup',
          insightKey: 'sources.max.camera.gaming.insight',
          adResult: 'Gaming hardware & electronics ads',
          adResultKey: 'sources.max.camera.gaming.adResult',
        },
      ],
    },
    contacts: {
      items: ['Close friend group: 5-6 high school friends', 'Campus contacts: classmates, help desk colleagues'],
      description: 'They map your college friend network, identify your closest friends, see your social circle strength and diversity.',
      descriptionDe: 'Sie kartografieren Ihr Uni-Freundesnetzwerk, identifizieren Ihre engsten Freunde und sehen die Stärke und Vielfalt Ihres sozialen Kreises.',
      sources: [
        {
          permissionEmoji: '👥',
          permissionName: 'Contacts',
          insight: 'Close friend group: 5-6 high school friends',
          insightKey: 'sources.max.contacts.friends.insight',
          adResult: 'Influencer identification in friend group',
          adResultKey: 'sources.max.contacts.friends.adResult',
        },
        {
          permissionEmoji: '👥',
          permissionName: 'Contacts',
          insight: 'Campus contacts: classmates & help desk colleagues',
          insightKey: 'sources.max.contacts.campus.insight',
          adResult: 'Social network mapping for targeting',
          adResultKey: 'sources.max.contacts.campus.adResult',
        },
      ],
      locationExtra: {
        permissionEmoji: '📍',
        permissionName: 'Location',
        insight: 'Gym & library patterns',
        insightKey: 'sources.max.contacts.locationExtra.insight',
        adResult: 'Social cluster mapping by location',
        adResultKey: 'sources.max.contacts.locationExtra.adResult',
      },
    },
    notifications: {
      extraItems: [
        'Late night activity: 10pm-2am gaming sessions',
        'Morning gym session prep: 5-6am activity spike',
        'Weekend social engagement: high notification response Sat/Sun nights',
      ],
      description:
        'They know you game at night, work out at dawn, socialize weekends. Target gaming deals at midnight, gym motivation at 5am, party invites on Friday nights.',
      descriptionDe:
        'Sie wissen, dass Sie nachts zocken, in der Frühe trainieren und am Wochenende sozial aktiv sind. Gaming-Deals um Mitternacht, Fitnessmotivation um 5 Uhr morgens, Party-Einladungen am Freitagabend.',
      sources: [
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Late night activity spike: 10pm-2am',
          insightKey: 'sources.max.notifications.lateNight.insight',
          adResult: 'Gaming deals pushed at midnight',
          adResultKey: 'sources.max.notifications.lateNight.adResult',
        },
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Morning gym session prep: 5-6am',
          insightKey: 'sources.max.notifications.morningGymNight.insight',
          adResult: 'Gym motivation ads at 5am, fitness deals',
          adResultKey: 'sources.max.notifications.morningGymNight.adResult',
        },
      ],
      locationExtra: {
        permissionEmoji: '📍',
        permissionName: 'Location',
        insight: 'Downtown on Saturday nights',
        insightKey: 'sources.max.notifications.downtown.insight',
        adResult: 'Social event & bar ads on Friday nights',
        adResultKey: 'sources.max.notifications.downtown.adResult',
      },
    },
    clipboard: {
      items: ['Gaming account passwords and credentials', 'College email and campus portal logins'],
      description:
        'They capture: gaming account passwords, college email logins, dating app credentials, payment info for in-game purchases.',
      descriptionDe:
        'Sie erfassen: Passwörter für Gaming-Konten, Uni-E-Mail-Logins, Zugangsdaten für Dating-Apps und Zahlungsdaten für In-Game-Käufe.',
      sources: [
        {
          permissionEmoji: '📋',
          permissionName: 'Clipboard',
          insight: 'Gaming account passwords & login credentials',
          insightKey: 'sources.max.clipboard.gaming.insight',
          adResult: 'Gaming account takeover & fraud targeting',
          adResultKey: 'sources.max.clipboard.gaming.adResult',
        },
        {
          permissionEmoji: '📋',
          permissionName: 'Clipboard',
          insight: 'College email & campus portal access',
          insightKey: 'sources.max.clipboard.email.insight',
          adResult: 'Educational credential theft targeting',
          adResultKey: 'sources.max.clipboard.email.adResult',
        },
      ],
    },
  },
  sarah: {
    location: {
      extraItems: ['School drop-off/pickup: 8am and 3pm daily', 'Office commute: 9am-5pm weekdays', 'Grocery and shopping routine: Weekly pattern'],
      description:
        'Ads for kids clothing stores near school, family restaurants, grocery deals on your shopping route, kids activities venues, suburban stores.',
      descriptionDe:
        'Anzeigen für Kinderbekleidungsgeschäfte in der Nähe der Schule, Familienrestaurants, Lebensmittelangebote auf Ihrer Einkaufsroute, Freizeitangebote für Kinder und Geschäfte in der Vorstadt.',
      baseSources: [
        {
          permissionEmoji: '📍',
          permissionName: 'Location',
          insight: 'School drop-off/pickup: 8am & 3pm daily',
          insightKey: 'sources.sarah.location.schoolPickup.insight',
          adResult: 'Kids clothing stores & family restaurants near school',
          adResultKey: 'sources.sarah.location.schoolPickup.adResult',
        },
      ],
      microphone: [
        {
          permissionEmoji: '🎤',
          permissionName: 'Audio',
          insight: 'Conversations about kids school & activities',
          insightKey: 'sources.sarah.microphone.kidsSchool.insight',
          adResult: 'Educational programs & kids sports camps',
          adResultKey: 'sources.sarah.microphone.kidsSchool.adResult',
        },
        {
          permissionEmoji: '🎤',
          permissionName: 'Audio',
          insight: 'Work stress & family planning talk',
          insightKey: 'sources.sarah.microphone.workFamily.insight',
          adResult: 'Family wellness & stress management services',
          adResultKey: 'sources.sarah.microphone.workFamily.adResult',
        },
      ],
      notifications: [
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Morning routine 7-8am (kids getting ready)',
          insightKey: 'sources.sarah.notifications.morningRush.insight',
          adResult: 'Quick breakfast & school supply ads at 7:30am',
          adResultKey: 'sources.sarah.notifications.morningRush.adResult',
        },
      ],
    },
    camera: {
      items: ['Professional work appearance and casual home attire', 'Family home with kids present in background'],
      description:
        'They can see professional you at work and family you with kids. Your home background reveals family status, kids ages, and lifestyle.',
      descriptionDe:
        'Sie sehen Sie beruflich bei der Arbeit und privat mit Ihren Kindern. Ihr Zuhause im Hintergrund verrät Familienstand, das Alter Ihrer Kinder und Ihren Lebensstil.',
      sources: [
        {
          permissionEmoji: '📹',
          permissionName: 'Camera',
          insight: 'Professional appearance at work',
          insightKey: 'sources.sarah.camera.workAppearance.insight',
          adResult: 'Workwear & professional services ads',
          adResultKey: 'sources.sarah.camera.workAppearance.adResult',
        },
        {
          permissionEmoji: '📹',
          permissionName: 'Camera',
          insight: 'Family home with kids visible',
          insightKey: 'sources.sarah.camera.familyHome.insight',
          adResult: 'Family-oriented products & parenting services',
          adResultKey: 'sources.sarah.camera.familyHome.adResult',
        },
      ],
    },
    contacts: {
      items: ['Family: spouse, kids, extended family', 'Professional network: work colleagues, manager', 'Parent network: school contacts, other parents'],
      description:
        'They identify you as parent, infer family size and ages, map your professional network, and identify parent community connections.',
      descriptionDe:
        'Sie erkennen Sie als Elternteil, leiten Familiengrösse und Alter ab, kartografieren Ihr berufliches Netzwerk und identifizieren Ihre Kontakte in der Elterngemeinschaft.',
      sources: [
        {
          permissionEmoji: '👥',
          permissionName: 'Contacts',
          insight: 'Spouse, kids, extended family',
          insightKey: 'sources.sarah.contacts.family.insight',
          adResult: 'Family status & household composition targeting',
          adResultKey: 'sources.sarah.contacts.family.adResult',
        },
        {
          permissionEmoji: '👥',
          permissionName: 'Contacts',
          insight: 'Parent network: school contacts & other parents',
          insightKey: 'sources.sarah.contacts.parentNetwork.insight',
          adResult: 'Parent community cluster targeting',
          adResultKey: 'sources.sarah.contacts.parentNetwork.adResult',
        },
      ],
      locationExtra: {
        permissionEmoji: '📍',
        permissionName: 'Location',
        insight: 'School pickup location with other parents',
        insightKey: 'sources.sarah.contacts.locationExtra.insight',
        adResult: 'Parent group ads & family event targeting',
        adResultKey: 'sources.sarah.contacts.locationExtra.adResult',
      },
    },
    notifications: {
      extraItems: [
        'Morning routine: 7-8am device activity (kids getting ready)',
        'School hours: lower responsiveness (work meetings)',
        'Evening family time: 6-9pm varied engagement',
      ],
      description:
        'They know your morning rush, work unavailability, evening family time. Target kid activities at school pickup time, work stress relief at 5pm, family deals at dinnertime.',
      descriptionDe:
        'Sie kennen Ihre morgendliche Hektik, Ihre Nichterreichbarkeit während der Arbeit und Ihre Familienzeit am Abend. Kinderaktivitäten zur Abholzeit an der Schule, Stressabbau-Angebote um 17 Uhr, Familienangebote zur Abendessenszeit.',
      sources: [
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Morning rush: 7-8am (kids getting ready)',
          insightKey: 'sources.sarah.notifications.morningRush.insight',
          adResult: 'Quick breakfast & school supplies at 7:30am',
          adResultKey: 'sources.sarah.notifications.morningRush.adResult',
        },
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Lower responsiveness during work (9-5)',
          insightKey: 'sources.sarah.notifications.workHours.insight',
          adResult: 'Work-related ads avoided, evening targeting instead',
          adResultKey: 'sources.sarah.notifications.workHours.adResult',
        },
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Evening family time: 6-9pm engagement',
          insightKey: 'sources.sarah.notifications.eveningFamily.insight',
          adResult: 'Family deals, dinner services at 6pm exactly',
          adResultKey: 'sources.sarah.notifications.eveningFamily.adResult',
        },
      ],
    },
    clipboard: {
      items: ['Kids school login information', 'Family budget notes and account numbers'],
      description:
        'They capture: kids school logins, family calendar info, budget spreadsheets, medical appointment notes, kids app passwords.',
      descriptionDe:
        'Sie erfassen: Schul-Logins Ihrer Kinder, Einträge aus dem Familienkalender, Budget-Tabellen, Notizen zu Arztterminen und Passwörter für Kinder-Apps.',
      sources: [
        {
          permissionEmoji: '📋',
          permissionName: 'Clipboard',
          insight: 'Kids school login information',
          insightKey: 'sources.sarah.clipboard.schoolLogin.insight',
          adResult: 'School account breach targeting parents',
          adResultKey: 'sources.sarah.clipboard.schoolLogin.adResult',
        },
        {
          permissionEmoji: '📋',
          permissionName: 'Clipboard',
          insight: 'Family budget notes & account numbers',
          insightKey: 'sources.sarah.clipboard.familyBudget.insight',
          adResult: 'Financial fraud & identity theft targeting',
          adResultKey: 'sources.sarah.clipboard.familyBudget.adResult',
        },
      ],
    },
  },
};

// Helper function to merge base data with persona customizations
export function getPersonaData(personaId) {
  return PERSONA_CONFIGS[personaId] || null;
}

// Helper function to get translated persona description
export function getPersonaDescription(personaId, permissionType, language = 'en') {
  const personaData = getPersonaData(personaId);
  if (!personaData?.[permissionType]) {
    return null;
  }
  
  const permission = personaData[permissionType];
  if (language === 'de' && permission.descriptionDe) {
    return permission.descriptionDe;
  }
  return permission.description || null;
}
