import UpdateUser from "../../components/account/Edits";
import { Query } from "react-apollo";
import PleaseSignIn from "../../components/auth/PleaseSignIn";
import { CURRENT_USER_QUERY } from "../../components/auth/User";

import Layout from "../../components/layout/index.js";

import CircularProgress from '@material-ui/core/CircularProgress';


const EditAccount = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {

      if (loading) return <CircularProgress style={{margin: 20}} />
      return (
        <Layout>
          {" "}
          <UpdateUser data={data} />
        </Layout>
      );

    }}
  </Query>
);

export default EditAccount;
