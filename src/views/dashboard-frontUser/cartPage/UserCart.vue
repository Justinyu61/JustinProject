<template>
  <div class="col-md-5">
    <div class="sticky-top">
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 110px">數量</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm">
                <i class="bi bi-x"></i>
              </button>
            </td>
            <td>
              標題
              <div class="text-success">
                已套用優惠券
              </div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <input type="number" class="form-control">
                <div class="input-group-text">/ 單位</div>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success">折扣價：</small>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">199</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">199</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" placeholder="請輸入優惠碼">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">
            套用優惠碼
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCart'
}
</script>

<style scoped>

</style>
