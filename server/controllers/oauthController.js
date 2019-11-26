const fetch = require('node-fetch');

module.exports = {

  loginLI(req, res, next) {
    fetch('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77mmt6otf0l7cw&redirect_uri=http://localhost:3000/main&state=fzJNKSDGLKJNDFJKNGHEKWRw43590687gdfs&scope=r_liteprofile%20r_emailaddress%20w_member_social')
      .then(data => {
        console.log('DATA URL -->', data.url)
        res.redirect(data.redirects)
        return next()
      })
      .catch(err => {
        if (err) res.status(500).sent('SERVER ERROR');
        console.log('LOGIN GET REQUEST ERROR');
      });
  },

  tokenLI(req, res, next) {
    const { code, state } = req.query;
    if (state !== OAUTH_STATE) {
      res
        .status(500)
        .send('Server error')
      return next()
    }
    fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/maink&client_id=77mmt6otf0l7cw&client_secret=I6IAlHNXbgzJ1Hn1`,
    })
      .then(data => data.json())
      .then(response => {
        const { accessToken, expiresIn } = req.body
        fetch('api.linkedin.com/v2/me', {
          headers: {
            Connection: 'Keep-Alive',
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(() => next())
      })
  },

}