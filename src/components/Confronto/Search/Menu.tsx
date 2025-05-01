import Grid from '@mui/material/Grid';
import Link from "next/link";

const Menu = () => {

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className='menu'>

      <Grid container spacing={2}>
        <Grid size={{ xs: 7, sm: 8 }}>
          <Link className='menu__link' href="/"><h1 className="menu__title">Confrontos Corridos</h1></Link>
        </Grid>


        <Grid size={{ xs: 5, sm: 4 }}>
          <h2 className='menu__refresh' onClick={handleRefresh}>novo confronto</h2>
        </Grid>
      </Grid>

    </div>
  );
};

export default Menu;