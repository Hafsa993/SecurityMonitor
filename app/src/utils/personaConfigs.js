// Persona-specific configurations and customizations
export const PERSONA_CONFIGS = {
  max: {
    location: {
      extraItems: ['Gym visits: Mon/Wed/Fri at 6am', 'Library study sessions: 10am-4pm daily', 'Weekend downtown hangouts: Saturday nights'],
      description: 'Ads for gaming cafes near campus, protein supplements near gym, coffee shops on your morning route, weekend bars and social spots downtown.',
      baseSources: [
        {
          permissionEmoji: '📍',
          permissionName: 'Location',
          insight: 'Gym visits: Mon/Wed/Fri at 6am',
          adResult: 'Protein supplements & fitness gear ads near gym',
        },
      ],
      microphone: [
        {
          permissionEmoji: '🎤',
          permissionName: 'Audio',
          insight: 'Conversations about gaming tournaments & wins',
          adResult: 'Gaming peripherals & esports event ads',
        },
        {
          permissionEmoji: '🎤',
          permissionName: 'Audio',
          insight: 'Fitness goals & gym discussion',
          adResult: 'Premium workout and nutrition ads',
        },
      ],
      notifications: [
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Morning gym session prep (5-6am spike)',
          adResult: 'Pre-workout ads & gym membership deals at 5am',
        },
      ],
    },
    camera: {
      items: ['Athletic build and casual college student style', 'Dorm room with gaming setup and fitness equipment'],
      description: 'They can see you in casual athletic wear at gym, in class at library, gaming at night. Your dorm setup reveals gaming interests and fitness focus.',
      sources: [
        {
          permissionEmoji: '📹',
          permissionName: 'Camera',
          insight: 'Athletic build in gym/casual college student style',
          adResult: 'Fitness & athletic brand targeting',
        },
        {
          permissionEmoji: '📹',
          permissionName: 'Camera',
          insight: 'Dorm room with gaming setup',
          adResult: 'Gaming hardware & electronics ads',
        },
      ],
    },
    contacts: {
      items: ['Close friend group: 5-6 high school friends', 'Campus contacts: classmates, help desk colleagues'],
      description: 'They map your college friend network, identify your closest friends, see your social circle strength and diversity.',
      sources: [
        {
          permissionEmoji: '👥',
          permissionName: 'Contacts',
          insight: 'Close friend group: 5-6 high school friends',
          adResult: 'Influencer identification in friend group',
        },
        {
          permissionEmoji: '👥',
          permissionName: 'Contacts',
          insight: 'Campus contacts: classmates & help desk colleagues',
          adResult: 'Social network mapping for targeting',
        },
      ],
      locationExtra: {
        permissionEmoji: '📍',
        permissionName: 'Location',
        insight: 'Gym & library patterns',
        adResult: 'Social cluster mapping by location',
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
      sources: [
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Late night activity spike: 10pm-2am',
          adResult: 'Gaming deals pushed at midnight',
        },
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Morning gym session prep: 5-6am',
          adResult: 'Gym motivation ads at 5am, fitness deals',
        },
      ],
      locationExtra: {
        permissionEmoji: '📍',
        permissionName: 'Location',
        insight: 'Downtown on Saturday nights',
        adResult: 'Social event & bar ads on Friday nights',
      },
    },
    clipboard: {
      items: ['Gaming account passwords and credentials', 'College email and campus portal logins'],
      description:
        'They capture: gaming account passwords, college email logins, dating app credentials, payment info for in-game purchases.',
      sources: [
        {
          permissionEmoji: '📋',
          permissionName: 'Clipboard',
          insight: 'Gaming account passwords & login credentials',
          adResult: 'Gaming account takeover & fraud targeting',
        },
        {
          permissionEmoji: '📋',
          permissionName: 'Clipboard',
          insight: 'College email & campus portal access',
          adResult: 'Educational credential theft targeting',
        },
      ],
    },
    comboWarnings: {
      locationContacts:
        '💡 Location + Contacts = They know which friends you hangout with where. Can map your social circle location patterns.',
      cameraMicrophone:
        '💡 Camera + Microphone = They see and hear your gaming, study sessions, and social hangouts simultaneously.',
      all: '💡 Location + Camera + Microphone = Complete surveillance of your college life: where you are, who you see, what you say.',
    },
  },
  sarah: {
    location: {
      extraItems: ['School drop-off/pickup: 8am and 3pm daily', 'Office commute: 9am-5pm weekdays', 'Grocery and shopping routine: Weekly pattern'],
      description:
        'Ads for kids clothing stores near school, family restaurants, grocery deals on your shopping route, kids activities venues, suburban stores.',
      baseSources: [
        {
          permissionEmoji: '📍',
          permissionName: 'Location',
          insight: 'School drop-off/pickup: 8am & 3pm daily',
          adResult: 'Kids clothing stores & family restaurants near school',
        },
      ],
      microphone: [
        {
          permissionEmoji: '🎤',
          permissionName: 'Audio',
          insight: 'Conversations about kids school & activities',
          adResult: 'Educational programs & kids sports camps',
        },
        {
          permissionEmoji: '🎤',
          permissionName: 'Audio',
          insight: 'Work stress & family planning talk',
          adResult: 'Family wellness & stress management services',
        },
      ],
      notifications: [
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Morning routine 7-8am (kids getting ready)',
          adResult: 'Quick breakfast & school supply ads at 7:30am',
        },
      ],
    },
    camera: {
      items: ['Professional work appearance and casual home attire', 'Family home with kids present in background'],
      description:
        'They can see professional you at work and family you with kids. Your home background reveals family status, kids ages, and lifestyle.',
      sources: [
        {
          permissionEmoji: '📹',
          permissionName: 'Camera',
          insight: 'Professional appearance at work',
          adResult: 'Workwear & professional services ads',
        },
        {
          permissionEmoji: '📹',
          permissionName: 'Camera',
          insight: 'Family home with kids visible',
          adResult: 'Family-oriented products & parenting services',
        },
      ],
    },
    contacts: {
      items: ['Family: spouse, kids, extended family', 'Professional network: work colleagues, manager', 'Parent network: school contacts, other parents'],
      description:
        'They identify you as parent, infer family size and ages, map your professional network, and identify parent community connections.',
      sources: [
        {
          permissionEmoji: '👥',
          permissionName: 'Contacts',
          insight: 'Spouse, kids, extended family',
          adResult: 'Family status & household composition targeting',
        },
        {
          permissionEmoji: '👥',
          permissionName: 'Contacts',
          insight: 'Parent network: school contacts & other parents',
          adResult: 'Parent community cluster targeting',
        },
      ],
      locationExtra: {
        permissionEmoji: '📍',
        permissionName: 'Location',
        insight: 'School pickup location with other parents',
        adResult: 'Parent group ads & family event targeting',
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
      sources: [
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Morning rush: 7-8am (kids getting ready)',
          adResult: 'Quick breakfast & school supplies at 7:30am',
        },
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Lower responsiveness during work (9-5)',
          adResult: 'Work-related ads avoided, evening targeting instead',
        },
        {
          permissionEmoji: '🔔',
          permissionName: 'Activity',
          insight: 'Evening family time: 6-9pm engagement',
          adResult: 'Family deals, dinner services at 6pm exactly',
        },
      ],
    },
    clipboard: {
      items: ['Kids school login information', 'Family budget notes and account numbers'],
      description:
        'They capture: kids school logins, family calendar info, budget spreadsheets, medical appointment notes, kids app passwords.',
      sources: [
        {
          permissionEmoji: '📋',
          permissionName: 'Clipboard',
          insight: 'Kids school login information',
          adResult: 'School account breach targeting parents',
        },
        {
          permissionEmoji: '📋',
          permissionName: 'Clipboard',
          insight: 'Family budget notes & account numbers',
          adResult: 'Financial fraud & identity theft targeting',
        },
      ],
    },
    comboWarnings: {
      locationContacts:
        '💡 Location + Contacts = They know you pick up kids at school, work commute with spouse. Tracks entire family movement.',
      cameraMicrophone: '💡 Camera + Microphone = They see and hear family dynamics: how you interact with kids, conversations, reactions.',
      all: '💡 Location + Camera + Microphone = Complete family surveillance: tracking kids locations, seeing family moments, hearing conversations.',
    },
  },
};

// Helper function to merge base data with persona customizations
export function getPersonaData(personaId) {
  return PERSONA_CONFIGS[personaId] || null;
}

// Helper function to get combo warning
export function getComboWarning(personaId, type) {
  const personaData = getPersonaData(personaId);
  if (personaData?.comboWarnings?.[type]) {
    return personaData.comboWarnings[type];
  }
  return null;
}
