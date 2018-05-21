<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div class="container">
        <a class="navbar-brand" href="javascript:;" @click="$router.push('/')">VueKoaCli</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample05">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="javascript:;" @click="$router.push('/signup')">Signup</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:;">Login</a>
            </li>
          </ul>
        </div>
      </div>
  </nav>
  </div>
</template>
