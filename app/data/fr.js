export default {
  messages: {
    header: {
      users: 'Utilisateurs',
      guides: 'Guides',
      account: 'Mon compte',
      logout: 'Se déconnecter',
      login: 'Se connecter'
    },
    guides: {
      'page-title': 'Guides'
    },
    protected: {
      'page-title': 'Page protégée'
    },
    profile: {
      'page-title': 'Profil - {fullName}',
      'not-found-page-title': 'User profile not found'
    },
    users: {
      'page-title': 'Utilisateurs',
      title: 'Des utilisateurs au hasard',
      email: 'Adresse email',
      actions: 'Opérations',
      add: 'Ajouter un utilisateur',
      profile: 'Profil'
    },
    login: {
      help: 'N\'importe quels informations fonctionneront. C\'est un exemple qui créér une fausse session.',
      username: {
        label: 'Utilisateur',
        placeholder: 'exemple@app.fr'
      },
      password: {
        label: 'Mot de passe'
      },
      submit: 'Se connecter'
    },
    routes: {
      users: '/utilisateurs',
      guides: '/guides',
      login: '/connexion',
      profile: '/profil/:seed',
      account: '/mon-compte'
    }
  }
};
