import Grid from '@mui/material/Grid';

const Menu = () => {

  return (
    <div className='menu'>

      <Grid container spacing={2}>
        <Grid size={{ xs: 8, sm: 8 }}>
          <h1 className="menu__title">Confrontos Corridos</h1>
        </Grid>


        <Grid size={{ xs: 4, sm: 4 }}>
          <a className='menu__link' href="/">novo confronto</a>
        </Grid>
      </Grid>

    </div>
  );
};

export default Menu;