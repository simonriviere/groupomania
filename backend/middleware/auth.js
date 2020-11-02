const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, '93U3hhBY_Vhchm3tr_dAjqAGDq_HDNVF33g_VKxwzn_bTPuqng_5MRaZJ5p_hPutBUCk_n7LPMAp_3K3vVGqn_hYBBpizj_6FZ4LN6_7njqjnzv_Q7tUs96_X9NgVLC_tKQhr4e_4xKj7e3f_HJKzy_BFyycxAw_zQTftN6q_TSzS4DzC_KKzvjm_NJUojn_GB4cqmu_HL_p2AS5_q_iUkJF7L_pXoqpC_UjCz4Z2_5Sdg4_FjZ9pyS_M7HiQ_9UD56jT_ggmQWSsU_bXr6C4p_tf3PsMK_jmaE3A_W7ATv_f9uSR_NRtg_mY_gQJYL_kq3_aibrS899_bsxZoJfK_v22sUDYi');
    const userId = decodedToken.userId;

  if (req.body.userId && req.body.userId !== userId) {
    console.log(userId);
    throw ' user ID est invalide';
  }
  else {
    next();
  }
} catch {
  res.status(401).json({
    error: new Error('Invalid request!')
  });
}
  
};